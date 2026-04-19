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

  useEffect(() => {
    baseFontSize.value = fontSize;
    baseLineHeight.value = lineHeight;
  }, [fontSize, lineHeight, baseFontSize, baseLineHeight]);

  return { x, y, baseFontSize, baseLineHeight };
}

export type TextElementState = ReturnType<typeof useTextElementState>;
