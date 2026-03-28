import { ImageSourcePropType } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { greetingApi } from "../api/greeting";

type FontEntry = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

const FONTS: FontEntry[] = [
  { fontFamily: "GreatVibes_400Regular", fontSize: 32, lineHeight: 44 },
  { fontFamily: "DancingScript_700Bold", fontSize: 30, lineHeight: 42 },
  { fontFamily: "PlayfairDisplay_400Regular", fontSize: 26, lineHeight: 38 },
  { fontFamily: "Sacramento_400Regular", fontSize: 36, lineHeight: 50 },
  { fontFamily: "Pacifico_400Regular", fontSize: 24, lineHeight: 36 },
  { fontFamily: "Inter_600SemiBold", fontSize: 18, lineHeight: 28 },
];

const FADE_DURATION = 180;

export function useGreetingStyle() {
  const [fontIndex, setFontIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const opacity = useSharedValue(1);

  const fetchImage = useCallback(async () => {
    const data = await greetingApi.getImage();
    setImageUrl(data.imageUrl);
  }, []);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const greetingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const advanceFont = useCallback(() => {
    setFontIndex((i) => (i + 1) % FONTS.length);
  }, []);

  function cycleFont() {
    opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
      if (!finished) return;
      scheduleOnRN(advanceFont);
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    });
  }

  function cycleImage() {
    fetchImage();
  }

  return {
    font: FONTS[fontIndex],
    image: { uri: imageUrl } as ImageSourcePropType,
    greetingAnimatedStyle,
    cycleFont,
    cycleImage,
  };
}
