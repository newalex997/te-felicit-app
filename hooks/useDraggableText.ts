import { Gesture } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export function useDraggableText() {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const gesture = Gesture.Pan().onChange((e) => {
    offsetX.value += e.changeX;
    offsetY.value += e.changeY;
  });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  return { gesture, dragStyle };
}
