import { useRef, useMemo } from "react";
import { styled } from "styled-components/native";
import { TextBlockId, useGreetingContext } from "../../context/GreetingContext";
import { TextBlockConfigDto } from "../../api/Api";
import { TextEditOverlay } from "./TextEditOverlay";
import { TextBlockItem } from "./TextBlockItem";
import { CardFontProvider, useCardFontContext } from "./CardFontContext";

const POSITION_STYLES: Record<
  TextBlockConfigDto["position"],
  { justifyContent: string; alignItems: string }
> = {
  "top-left": { justifyContent: "flex-start", alignItems: "flex-start" },
  "top-center": { justifyContent: "flex-start", alignItems: "center" },
  "top-right": { justifyContent: "flex-start", alignItems: "flex-end" },
  "center-left": { justifyContent: "center", alignItems: "flex-start" },
  center: { justifyContent: "center", alignItems: "center" },
  "center-right": { justifyContent: "center", alignItems: "flex-end" },
  "bottom-left": { justifyContent: "flex-end", alignItems: "flex-start" },
  "bottom-center": { justifyContent: "flex-end", alignItems: "center" },
  "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end" },
};

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`;

const BackgroundDismiss = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PositionLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

function CardFontInner() {
  const { textBlocks, setFocusedBlockId, setBlockText } = useGreetingContext();
  const { editingBlockId, setEditingBlockId } = useCardFontContext();
  const blockWidths = useRef<Partial<Record<TextBlockId, number>>>({});

  const visibleBlocks = useMemo(
    () => textBlocks.filter((b) => b.text),
    [textBlocks],
  );

  const positionGroups = useMemo(
    () =>
      visibleBlocks.reduce<Map<string, typeof visibleBlocks>>((map, block) => {
        if (!map.has(block.position)) map.set(block.position, []);
        map.get(block.position)!.push(block);
        return map;
      }, new Map()),
    [visibleBlocks],
  );

  const editingBlock = useMemo(
    () =>
      editingBlockId
        ? visibleBlocks.find((b) => b.id === editingBlockId)
        : null,
    [editingBlockId, visibleBlocks],
  );

  function openEditing(blockId: TextBlockId) {
    setFocusedBlockId(blockId);
    setEditingBlockId(blockId);
  }

  function closeEditing() {
    setFocusedBlockId(null);
    setEditingBlockId(null);
  }

  return (
    <Container>
      <BackgroundDismiss onPress={closeEditing} />
      {Array.from(positionGroups.entries()).map(([position, blocks]) => (
        <PositionLayer
          key={position}
          style={POSITION_STYLES[position as TextBlockConfigDto["position"]]}
        >
          {blocks.map((block) => (
            <TextBlockItem
              key={block.id}
              block={block}
              isEditing={editingBlockId === block.id}
              onTap={() => openEditing(block.id)}
              onWidthChange={(width) => {
                blockWidths.current[block.id] = width;
              }}
            />
          ))}
        </PositionLayer>
      ))}
      {editingBlock && (
        <TextEditOverlay
          block={editingBlock}
          textWidth={blockWidths.current[editingBlock.id]}
          onTextChange={(text) => setBlockText(editingBlock.id, text)}
          onEditEnd={closeEditing}
        />
      )}
    </Container>
  );
}

export function CardFont() {
  return (
    <CardFontProvider>
      <CardFontInner />
    </CardFontProvider>
  );
}
