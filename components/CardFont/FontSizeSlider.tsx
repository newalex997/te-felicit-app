import { useEffect, useRef } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { styled } from "styled-components/native";
const SLIDER_HEIGHT = 150;
const TRACK_WIDTH_MAX = 26;
const TRACK_WIDTH_MIN = 4;
const TAPER = (TRACK_WIDTH_MAX - TRACK_WIDTH_MIN) / 2;

const Container = styled.View`
  width: ${TRACK_WIDTH_MAX}px;
  height: ${SLIDER_HEIGHT}px;
  margin: 8px 0px 8px 4px;
`;

const trackBackgroundStyle = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  width: TRACK_WIDTH_MIN,
  height: 0,
  borderTopWidth: SLIDER_HEIGHT,
  borderTopColor: "rgba(255, 255, 255, 0.25)",
  borderLeftWidth: TAPER,
  borderLeftColor: "transparent",
  borderRightWidth: TAPER,
  borderRightColor: "transparent",
};

const TrackFill = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  width: ${TRACK_WIDTH_MIN}px;
  height: 0px;
`;

function toThumbY(size: number, fontMin: number, fontMax: number) {
  const clamped = Math.max(fontMin, Math.min(fontMax, size));
  return SLIDER_HEIGHT * (1 - (clamped - fontMin) / (fontMax - fontMin));
}

function toFontSize(y: number, fontMin: number, fontMax: number) {
  const ratio = 1 - Math.max(0, Math.min(SLIDER_HEIGHT, y)) / SLIDER_HEIGHT;
  return Math.round(fontMin + ratio * (fontMax - fontMin));
}

type Props = {
  value: number;
  baseFontSize: number;
  onChange: (size: number) => void;
};

const FONT_SIZE_MIN_RATIO = 0.8;
const FONT_SIZE_MAX_RATIO = 1.2;
const MIN_FILL_RATIO = 0.2;

export function FontSizeSlider({ value, baseFontSize, onChange }: Props) {
  const fontMin = Math.round(baseFontSize * FONT_SIZE_MIN_RATIO);
  const fontMax = Math.round(baseFontSize * FONT_SIZE_MAX_RATIO);
  const isDragging = useRef(false);
  const thumbY = useSharedValue(toThumbY(value, fontMin, fontMax));
  const startY = useSharedValue(0);

  useEffect(() => {
    if (!isDragging.current) {
      thumbY.value = toThumbY(value, fontMin, fontMax);
    }
  }, [value, fontMin, fontMax, thumbY]);

  const panGesture = Gesture.Pan()
    .hitSlop({ horizontal: 20 })
    .runOnJS(true)
    .onBegin(() => {
      isDragging.current = true;
      startY.value = thumbY.value;
    })
    .onUpdate((e) => {
      const newY = Math.max(
        0,
        Math.min(SLIDER_HEIGHT, startY.value + e.translationY),
      );
      thumbY.value = newY;
      onChange(toFontSize(newY, fontMin, fontMax));
    })
    .onFinalize(() => {
      isDragging.current = false;
    });

  const fillAnimatedStyle = useAnimatedStyle(() => {
    const fillHeight = Math.max(
      SLIDER_HEIGHT * MIN_FILL_RATIO,
      SLIDER_HEIGHT - thumbY.value,
    );
    const taperAmount = TAPER * (fillHeight / SLIDER_HEIGHT);
    return {
      left: TAPER - taperAmount,
      borderTopWidth: fillHeight,
      borderTopColor: "rgba(255, 255, 255, 0.85)",
      borderLeftWidth: taperAmount,
      borderLeftColor: "transparent",
      borderRightWidth: taperAmount,
      borderRightColor: "transparent",
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
