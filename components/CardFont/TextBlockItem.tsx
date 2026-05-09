import { styled } from "styled-components/native";
import { TextBlock } from "../../context/GreetingContext";
import { DraggableText } from "./DraggableText";
import { useTextElementState } from "./useTextElementState";

const TextContainer = styled.View`
  width: 85%;
`;

type Props = {
  block: TextBlock;
  isEditing: boolean;
  onTap: () => void;
  onWidthChange: (width: number) => void;
};

export function TextBlockItem({
  block,
  isEditing,
  onTap,
  onWidthChange,
}: Props) {
  const state = useTextElementState({
    fontSize: block.fontSize,
    lineHeight: block.lineHeight,
  });

  if (isEditing) return null;

  return (
    <TextContainer onLayout={(e) => onWidthChange(e.nativeEvent.layout.width)}>
      <DraggableText
        state={state}
        style={{
          fontFamily: block.fontFamily,
          color: block.color,
          textAlign: block.textAlign,
          ...block.textEffectStyle,
        }}
        animatedStyle={block.animatedStyle}
        onTap={onTap}
        textEffect={block.textEffect}
        strokeColor={block.strokeColor}
      >
        {block.text}
      </DraggableText>
    </TextContainer>
  );
}
