import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";

type Options = {
  fontSize: number;
  lineHeight: number;
};

export function useTextElementState({ fontSize, lineHeight }: Options) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const baseFontSize = useSharedValue(fontSize);
  const baseLineHeight = useSharedValue(lineHeight);
  const fontSizeOffset = useSharedValue(0);

  // Keep base size in sync when the font prop changes (e.g. changeFont cycles fonts)
  useEffect(() => {
    baseFontSize.value = fontSize;
    baseLineHeight.value = lineHeight;
  }, [fontSize, lineHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  return { x, y, baseFontSize, baseLineHeight, fontSizeOffset };
}

export type TextElementState = ReturnType<typeof useTextElementState>;
