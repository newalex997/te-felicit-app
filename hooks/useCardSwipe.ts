import { useWindowDimensions } from "react-native";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SWIPE_OUT_DURATION = 300;

export function useCardSwipe(onSwipeOut: () => Promise<void>) {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ translateX: translateX.value }, { rotate: `${rotate.value}deg` }],
  }));

  async function swipe() {
    translateX.value = withTiming(width + 100, { duration: SWIPE_OUT_DURATION });
    rotate.value = withTiming(6, { duration: SWIPE_OUT_DURATION });

    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, SWIPE_OUT_DURATION)),
      onSwipeOut(),
    ]);

    cancelAnimation(translateX);
    cancelAnimation(rotate);
    translateX.value = -(width + 100);
    rotate.value = -4;

    translateX.value = withSpring(0, { damping: 18, stiffness: 120 });
    rotate.value = withSpring(0, { damping: 18, stiffness: 120 });
  }

  return { cardStyle, swipe };
}
