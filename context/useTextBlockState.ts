import { useCallback, useEffect, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TextBlockConfigDto } from "../api/Api";

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

export const FONTS: string[] = [
  "GreatVibes_400Regular",
  "DancingScript_400Regular",
  "DancingScript_700Bold",
  "Lora_400Regular",
  "Lora_700Bold",
  "CormorantGaramond_300Light",
  "CormorantGaramond_600SemiBold",
  "PlayfairDisplay_400Regular",
  "PlayfairDisplay_400Regular_Italic",
  "PlayfairDisplay_700Bold",
  "Pacifico_400Regular",
  "Inter_400Regular",
  "Inter_600SemiBold",
];

export type TextEffect = "none" | "shadow" | "outline" | "border";

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 0.45 ? "#000000" : "#FFFFFF";
}

export function getTextStrokeColor(
  effect: TextEffect,
  color: string,
): string | undefined {
  if (effect !== "border") return undefined;
  return getContrastColor(color);
}

function computeTextEffectStyle(effect: TextEffect, color: string): TextStyle {
  if (effect === "none" || effect === "border") return {};
  const contrastColor = getContrastColor(color);
  if (effect === "shadow") {
    return {
      textShadowColor: contrastColor,
      textShadowOffset: { width: 2, height: 3 },
      textShadowRadius: 4,
    };
  }
  // outline — simulated via tight multi-directional glow
  return {
    textShadowColor: contrastColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  };
}

const FADE_DURATION = 180;
const LINE_HEIGHT_RATIO = 1.4;

export function useTextBlockState(initialConfig: TextBlockConfigDto | null) {
  const [fontIndex, setFontIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number>(
    initialConfig?.fontSize ?? 0,
  );
  const [color, setColor] = useState<string>(
    initialConfig?.color ?? TEXT_COLORS[0],
  );
  const [textEffect, setTextEffect] = useState<TextEffect>(
    initialConfig?.textEffect ?? "none",
  );
  const opacity = useSharedValue(1);

  const animatedStyle: AnimatedStyle<ViewStyle> = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    setFontIndex(0);
    setFontSize(initialConfig?.fontSize ?? 0);
    setColor(initialConfig?.color ?? TEXT_COLORS[0]);
    setTextEffect(initialConfig?.textEffect ?? "none");
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

  const cycleTextEffect = useCallback(() => {
    setTextEffect((prev) => {
      if (prev === "none") return "shadow";
      if (prev === "shadow") return "outline";
      if (prev === "outline") return "border";
      return "none";
    });
  }, []);

  const fontFamily = FONTS[fontIndex];
  const lineHeight = Math.round(fontSize * LINE_HEIGHT_RATIO);
  const textEffectStyle = computeTextEffectStyle(textEffect, color);
  const strokeColor = getTextStrokeColor(textEffect, color);

  return {
    fontFamily,
    fontSize,
    lineHeight,
    color,
    textEffect,
    textEffectStyle,
    strokeColor,
    animatedStyle,
    cycleFont,
    cycleColor,
    cycleTextEffect,
    setFontSize,
  };
}

export type TextBlockState = ReturnType<typeof useTextBlockState>;
