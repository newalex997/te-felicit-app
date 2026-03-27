import { ImageSourcePropType } from "react-native";
import { useCallback, useState } from "react";
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type FontEntry = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

const FONTS: FontEntry[] = [
  { fontFamily: "GreatVibes_400Regular", fontSize: 32, lineHeight: 44 },
  { fontFamily: "Inter_600SemiBold", fontSize: 18, lineHeight: 28 },
];

const IMAGES: ImageSourcePropType[] = [
  require("../assets/mocks/coffe_image.png"),
  require("../assets/mocks/cat_image.png"),
  require("../assets/mocks/eagle_image.png"),
];

const FADE_DURATION = 180;

export function useGreetingStyle() {
  const [fontIndex, setFontIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const opacity = useSharedValue(1);

  const greetingAnimatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const advanceFont = useCallback(() => {
    setFontIndex((i) => (i + 1) % FONTS.length);
  }, []);

  function cycleFont() {
    opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
      if (!finished) return;
      runOnJS(advanceFont)();
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    });
  }

  function cycleImage() {
    setImageIndex((i) => (i + 1) % IMAGES.length);
  }

  return {
    font: FONTS[fontIndex],
    image: IMAGES[imageIndex],
    greetingAnimatedStyle,
    cycleFont,
    cycleImage,
  };
}
