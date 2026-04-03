import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useGreetingContext } from "../context/GreetingContext";
import { useDraggableText } from "../hooks/useDraggableText";
import { Greeting } from "../app/index.styles";

export function CardFont() {
  const { text, font, fontSizeOffset, textColor, greetingAnimatedStyle, changeFontSize } =
    useGreetingContext();
  const { gesture, dragStyle } = useDraggableText();

  const prevScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      prevScale.value = 1;
    })
    .onUpdate((e) => {
      const delta = (e.scale - prevScale.value) * 20;
      if (Math.abs(delta) >= 1) {
        prevScale.value = e.scale;
        scheduleOnRN(changeFontSize, Math.round(delta));
      }
    });

  const combinedGesture = Gesture.Simultaneous(gesture, pinchGesture);

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={dragStyle}>
        <Animated.View style={greetingAnimatedStyle}>
          <Greeting
            style={{
              ...font,
              color: textColor,
              fontSize: font.fontSize + fontSizeOffset,
              lineHeight: font.lineHeight + fontSizeOffset,
            }}
          >
            {text}
          </Greeting>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
