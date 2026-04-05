import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { TextElementState } from "./useTextElementState";

const FONT_SIZE_MIN_DELTA = -12;
const FONT_SIZE_MAX_DELTA = 24;
const PINCH_SENSITIVITY = 20;

type Props = {
  children: string;
  state: TextElementState;
  style: StyleProp<TextStyle>;
  animatedStyle?: AnimatedStyle<ViewStyle>;
  isSelected?: boolean;
  onTap?: () => void;
};

export function DraggableText({
  children,
  state,
  style,
  animatedStyle,
  isSelected = false,
  onTap,
}: Props) {
  const { x, y, baseFontSize, baseLineHeight, fontSizeOffset } = state;
  const prevScale = useSharedValue(1);

  const panGesture = Gesture.Pan().onChange((e) => {
    x.value += e.changeX;
    y.value += e.changeY;
  });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      prevScale.value = 1;
    })
    .onUpdate((e) => {
      const delta = (e.scale - prevScale.value) * PINCH_SENSITIVITY;
      if (Math.abs(delta) >= 1) {
        prevScale.value = e.scale;
        fontSizeOffset.value = Math.max(
          FONT_SIZE_MIN_DELTA,
          Math.min(
            FONT_SIZE_MAX_DELTA,
            fontSizeOffset.value + Math.round(delta),
          ),
        );
      }
    });

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      onTap?.();
    });

  const combined = Gesture.Simultaneous(panGesture, pinchGesture, tapGesture);

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  const sizeStyle = useAnimatedStyle(() => ({
    fontSize: baseFontSize.value + fontSizeOffset.value,
    lineHeight: baseLineHeight.value + fontSizeOffset.value,
  }));

  return (
    <GestureDetector gesture={combined}>
      <Animated.View style={dragStyle}>
        <Animated.View style={animatedStyle}>
          <View style={isSelected ? styles.selected : styles.unselected}>
            <Animated.Text style={[style, sizeStyle]}>{children}</Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  selected: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 6,
    padding: 6,
  },
  unselected: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "transparent",
    borderRadius: 6,
    padding: 6,
  },
});
