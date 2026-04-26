import { useEffect, useRef } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { styled } from "styled-components/native";

const SLIDER_WIDTH = 150;
const TRACK_HEIGHT_MAX = 26;
const TRACK_HEIGHT_MIN = 4;
const TAPER = (TRACK_HEIGHT_MAX - TRACK_HEIGHT_MIN) / 2;

const FONT_SIZE_MIN_RATIO = 0.8;
const FONT_SIZE_MAX_RATIO = 1.2;
const MIN_FILL_RATIO = 0.2;

const Container = styled.View`
  width: ${SLIDER_WIDTH}px;
  height: ${TRACK_HEIGHT_MAX}px;
  margin: 0px 8px;
`;

const TrackFill = styled(Animated.View)`
  position: absolute;
  left: 0;
  height: 0px;
  width: 0px;
`;

const trackBackgroundStyle = {
  position: "absolute" as const,
  left: 0,
  top: 0,
  height: TRACK_HEIGHT_MIN,
  width: 0,
  borderRightWidth: SLIDER_WIDTH,
  borderRightColor: "rgba(255, 255, 255, 0.25)",
  borderTopWidth: TAPER,
  borderTopColor: "transparent",
  borderBottomWidth: TAPER,
  borderBottomColor: "transparent",
};

function toThumbX(size: number, fontMin: number, fontMax: number) {
  const clamped = Math.max(fontMin, Math.min(fontMax, size));
  return SLIDER_WIDTH * ((clamped - fontMin) / (fontMax - fontMin));
}

function toFontSize(x: number, fontMin: number, fontMax: number) {
  const ratio = Math.max(0, Math.min(SLIDER_WIDTH, x)) / SLIDER_WIDTH;
  return Math.round(fontMin + ratio * (fontMax - fontMin));
}

type Props = {
  value: number;
  baseFontSize: number;
  onChange: (size: number) => void;
};

export function FontSizeSlider({ value, baseFontSize, onChange }: Props) {
  const fontMin = Math.round(baseFontSize * FONT_SIZE_MIN_RATIO);
  const fontMax = Math.round(baseFontSize * FONT_SIZE_MAX_RATIO);
  const isDragging = useRef(false);
  const thumbX = useSharedValue(toThumbX(value, fontMin, fontMax));
  const startX = useSharedValue(0);

  useEffect(() => {
    if (!isDragging.current) {
      thumbX.value = toThumbX(value, fontMin, fontMax);
    }
  }, [value, fontMin, fontMax, thumbX]);

  const panGesture = Gesture.Pan()
    .hitSlop({ vertical: 20 })
    .runOnJS(true)
    .onBegin(() => {
      isDragging.current = true;
      startX.value = thumbX.value;
    })
    .onUpdate((e) => {
      const newX = Math.max(
        0,
        Math.min(SLIDER_WIDTH, startX.value + e.translationX),
      );
      thumbX.value = newX;
      onChange(toFontSize(newX, fontMin, fontMax));
    })
    .onFinalize(() => {
      isDragging.current = false;
    });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const fillWidth = Math.max(SLIDER_WIDTH * MIN_FILL_RATIO, thumbX.value);
    const taperAmount = TAPER * (fillWidth / SLIDER_WIDTH);
    return {
      top: TAPER - taperAmount,
      borderRightWidth: fillWidth,
      borderRightColor: "rgba(255, 255, 255, 0.85)",
      borderTopWidth: taperAmount,
      borderTopColor: "transparent",
      borderBottomWidth: taperAmount,
      borderBottomColor: "transparent",
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Container>
        <View style={trackBackgroundStyle} />
        <TrackFill style={fillAnimatedStyle} />
      </Container>
    </GestureDetector>
  );
}
