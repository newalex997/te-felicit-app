import { Pressable, StyleSheet, View } from "react-native";
import { TextBlock, useGreetingContext } from "../../context/GreetingContext";
import { useTextElementState } from "./useTextElementState";
import { DraggableText } from "./DraggableText";

type TextBlockItemProps = {
  block: TextBlock;
  isSelected: boolean;
  onTap: () => void;
};

function TextBlockItem({ block, isSelected, onTap }: TextBlockItemProps) {
  const fontSize = block.font.fontSize * block.fontSizeMultiplier;
  const lineHeight = block.font.lineHeight * block.fontSizeMultiplier;
  const state = useTextElementState({ fontSize, lineHeight });

  return (
    <DraggableText
      state={state}
      style={{
        ...block.font,
        fontSize,
        lineHeight,
        color: block.color,
        textAlign: "center",
      }}
      animatedStyle={block.animatedStyle}
      isSelected={isSelected}
      onTap={onTap}
    >
      {block.text}
    </DraggableText>
  );
}

export function CardFont() {
  const { textBlocks, focusedBlockId, setFocusedBlockId } =
    useGreetingContext();

  return (
    <View style={styles.container}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => setFocusedBlockId(null)}
      />
      {textBlocks.map((block) =>
        block.text ? (
          <TextBlockItem
            key={`${block.id}-${block.text}`}
            block={block}
            isSelected={focusedBlockId === block.id}
            onTap={() => setFocusedBlockId(block.id)}
          />
        ) : null,
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
