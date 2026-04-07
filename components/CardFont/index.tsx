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
    <View
      style={[
        StyleSheet.absoluteFill,
        getPositionContainerStyle(block.position),
      ]}
    >
      <DraggableText
        state={state}
        style={{
          fontFamily: block.font.fontFamily,
          fontSize: block.fontSize,
          lineHeight: block.lineHeight,
          color: block.color,
          textAlign: "center",
        }}
        animatedStyle={block.animatedStyle}
        isSelected={isSelected}
        onTap={onTap}
      >
        {block.text}
      </DraggableText>
    </View>
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
    alignSelf: "stretch",
  },
});
