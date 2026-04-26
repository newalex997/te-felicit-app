import { Keyboard, Modal, TextInput } from "react-native";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { styled } from "styled-components/native";
import { TextBlock } from "../../context/GreetingContext";
import { CardFontButtons } from "./CardFontButtons";

type Props = {
  block: TextBlock;
  textWidth: number | undefined;
  onTextChange: (text: string) => void;
  onEditEnd: () => void;
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.75);
`;

const DismissArea = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TextArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Toolbar = styled(Animated.View)`
  width: 100%;
`;


export function TextEditOverlay({ block, textWidth, onTextChange, onEditEnd }: Props) {
  const keyboard = useAnimatedKeyboard();

  const toolbarStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value,
  }));

  function dismiss() {
    Keyboard.dismiss();
    onEditEnd();
  }

  return (
    <Modal transparent animationType="fade" onRequestClose={dismiss}>
      <Overlay>
        <DismissArea onPress={dismiss} />

        <TextArea pointerEvents="box-none">
          <TextInput
            value={block.text}
            onChangeText={onTextChange}
            autoFocus
            multiline
            style={{
              textAlignVertical: "center",
              width: textWidth,
              fontFamily: block.fontFamily,
              color: block.color,
              fontSize: block.fontSize,
              lineHeight: block.lineHeight,
              textAlign: block.textAlign,
              ...block.textEffectStyle,
            }}
          />
        </TextArea>

        <Toolbar style={toolbarStyle}>
          <CardFontButtons />
        </Toolbar>
      </Overlay>
    </Modal>
  );
}
