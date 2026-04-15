import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { TextBlock, useGreetingContext } from "../../context/GreetingContext";
import { TextBlockConfigDto } from "../../api/Api";
import { useTextElementState } from "./useTextElementState";
import { DraggableText } from "./DraggableText";

function getPositionContainerStyle(
  position: TextBlockConfigDto["position"],
): ViewStyle {
  const [vertical, horizontal = "center"] = position.split("-");
  return {
    justifyContent:
      vertical === "top"
        ? "flex-start"
        : vertical === "bottom"
          ? "flex-end"
          : "center",
    alignItems:
      horizontal === "left"
        ? "flex-start"
        : horizontal === "right"
          ? "flex-end"
          : "center",
  };
}

type TextBlockItemProps = {
  block: TextBlock;
  isSelected: boolean;
  onTap: () => void;
};

function TextBlockItem({ block, isSelected, onTap }: TextBlockItemProps) {
  const state = useTextElementState({
    fontSize: block.fontSize,
    lineHeight: block.lineHeight,
  });

  return (
    <DraggableText
      state={state}
      style={{
        fontFamily: block.font.fontFamily,
        fontSize: block.fontSize,
        lineHeight: block.lineHeight,
        color: block.color,
        textAlign: "center",
        ...block.textEffectStyle,
      }}
      animatedStyle={block.animatedStyle}
      isSelected={isSelected}
      onTap={onTap}
      textEffect={block.textEffect}
      strokeColor={block.strokeColor}
    >
      {block.text}
    </DraggableText>
  );
}

export function CardFont() {
  const { textBlocks, focusedBlockId, setFocusedBlockId } =
    useGreetingContext();

  const visibleBlocks = textBlocks.filter((b) => b.text);

  const positionGroups = visibleBlocks.reduce<
    Map<string, typeof visibleBlocks>
  >((map, block) => {
    const key = block.position;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(block);
    return map;
  }, new Map());

  return (
    <View style={styles.container}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => setFocusedBlockId(null)}
      />
      {Array.from(positionGroups.entries()).map(([position, blocks]) => (
        <View
          key={position}
          style={[
            StyleSheet.absoluteFill,
            getPositionContainerStyle(
              position as TextBlockConfigDto["position"],
            ),
          ]}
        >
          {blocks.map((block) => (
            <TextBlockItem
              key={`${block.id}-${block.text}`}
              block={block}
              isSelected={focusedBlockId === block.id}
              onTap={() => setFocusedBlockId(block.id)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
});
