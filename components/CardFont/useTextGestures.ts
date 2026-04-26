import { Gesture } from "react-native-gesture-handler";
import { useAnimatedStyle } from "react-native-reanimated";
import { TextElementState } from "./useTextElementState";

export function useTextGestures(
  state: TextElementState,
  { onTap }: { onTap?: () => void },
) {
  const { x, y } = state;

  const pan = Gesture.Pan().onChange((e) => {
    x.value += e.changeX;
    y.value += e.changeY;
  });

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => onTap?.());

  const gesture = Gesture.Simultaneous(pan, tap);

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return { gesture, dragStyle };
}
