import { useCallback, useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TextBlockConfigDto } from "../api/Api";

export type FontEntry = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

export const TEXT_COLORS = [
  "#FFFFFF",
  "#FFE066",
  "#FFB3C1",
  "#A8EDEA",
  "#C3B1E1",
  "#FFDAB9",
  "#000000",
  "#FF6B6B",
  "#FF9F43",
  "#6BCB77",
  "#4D96FF",
  "#BF5FFF",
  "#F8CDDA",
  "#B8E9C0",
  "#D4A5A5",
  "#A0C4FF",
] as const;

export const FONTS: FontEntry[] = [
  { fontFamily: "GreatVibes_400Regular", fontSize: 32, lineHeight: 44 },
  { fontFamily: "DancingScript_400Regular", fontSize: 30, lineHeight: 42 },
  { fontFamily: "DancingScript_700Bold", fontSize: 30, lineHeight: 42 },
  { fontFamily: "Lora_400Regular", fontSize: 24, lineHeight: 36 },
  { fontFamily: "Lora_700Bold", fontSize: 24, lineHeight: 36 },
  { fontFamily: "CormorantGaramond_300Light", fontSize: 28, lineHeight: 40 },
  { fontFamily: "CormorantGaramond_600SemiBold", fontSize: 26, lineHeight: 38 },
  { fontFamily: "PlayfairDisplay_400Regular", fontSize: 26, lineHeight: 38 },
  {
    fontFamily: "PlayfairDisplay_400Regular_Italic",
    fontSize: 26,
    lineHeight: 38,
  },
  { fontFamily: "PlayfairDisplay_700Bold", fontSize: 24, lineHeight: 36 },
  { fontFamily: "Pacifico_400Regular", fontSize: 24, lineHeight: 36 },
  { fontFamily: "Inter_400Regular", fontSize: 18, lineHeight: 28 },
  { fontFamily: "Inter_600SemiBold", fontSize: 18, lineHeight: 28 },
];

const FADE_DURATION = 180;
const LINE_HEIGHT_RATIO = 1.4;

export function useTextBlockState(initialConfig: TextBlockConfigDto | null) {
  const [fontIndex, setFontIndex] = useState(0);
  const [color, setColor] = useState<string>(
    initialConfig?.color ?? TEXT_COLORS[0],
  );
  const opacity = useSharedValue(1);

  const animatedStyle: AnimatedStyle<ViewStyle> = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    setFontIndex(0);
    setColor(initialConfig?.color ?? TEXT_COLORS[0]);
  }, [initialConfig]);

  const cycleFont = useCallback(() => {
    opacity.value = withTiming(0, { duration: FADE_DURATION });
    setTimeout(() => {
      setFontIndex((prev) => (prev + 1) % FONTS.length);
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    }, FADE_DURATION);
  }, [opacity]);

  const cycleColor = useCallback(() => {
    setColor((prev) => {
      const idx = TEXT_COLORS.indexOf(prev as (typeof TEXT_COLORS)[number]);
      return TEXT_COLORS[(idx + 1) % TEXT_COLORS.length];
    });
  }, []);

  const font = FONTS[fontIndex];
  const fontSize =
    fontIndex === 0 && initialConfig?.fontSize != null
      ? initialConfig.fontSize
      : font.fontSize;
  const lineHeight =
    fontIndex === 0 && initialConfig?.fontSize != null
      ? Math.round(initialConfig.fontSize * LINE_HEIGHT_RATIO)
      : font.lineHeight;

  return {
    font,
    fontSize,
    lineHeight,
    color,
    animatedStyle,
    cycleFont,
    cycleColor,
  };
}

export type TextBlockState = ReturnType<typeof useTextBlockState>;
