import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ImageSourcePropType, ViewStyle } from "react-native";
import { scheduleOnRN } from "react-native-worklets";
import {
  AnimatedStyle,
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

const TEXT_COLORS = [
  "#FFFFFF",
  "#FFE066",
  "#FFB3C1",
  "#A8EDEA",
  "#C3B1E1",
  "#FFDAB9",
] as const;

const FONTS: FontEntry[] = [
  { fontFamily: "GreatVibes_400Regular", fontSize: 32, lineHeight: 44 },
  { fontFamily: "DancingScript_700Bold", fontSize: 30, lineHeight: 42 },
  { fontFamily: "PlayfairDisplay_400Regular", fontSize: 26, lineHeight: 38 },
  { fontFamily: "Sacramento_400Regular", fontSize: 36, lineHeight: 50 },
  { fontFamily: "Pacifico_400Regular", fontSize: 24, lineHeight: 36 },
  { fontFamily: "Inter_600SemiBold", fontSize: 18, lineHeight: 28 },
];

const FADE_DURATION = 180;

interface GreetingContextValue {
  text: string;
  image: ImageSourcePropType;
  loading: boolean;
  font: FontEntry;
  fontSizeOffset: number;
  textColor: string;
  greetingAnimatedStyle: AnimatedStyle<ViewStyle>;
  fetchGreeting: () => Promise<void>;
  changeFont: () => void;
  changeImage: () => void;
  changeColor: () => void;
  changeFontSize: (delta: number) => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const opacity = useSharedValue(1);

  const fetchGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting();
      setText(data.message);
      setImageUrl(data.imageUrl);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchImage = useCallback(async () => {
    const data = await greetingApi.getImage();
    setImageUrl(data.imageUrl);
  }, []);

  useEffect(() => {
    fetchGreeting();
  }, [fetchGreeting]);

  const greetingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const advanceFont = useCallback(() => {
    setFontIndex((i) => (i + 1) % FONTS.length);
    setFontSizeOffset(0);
  }, []);

  function changeFontSize(delta: number) {
    setFontSizeOffset((prev) => Math.max(-12, Math.min(24, prev + delta)));
  }

  function changeFont() {
    opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
      if (!finished) return;
      scheduleOnRN(advanceFont);
      opacity.value = withTiming(1, { duration: FADE_DURATION });
    });
  }

  function changeImage() {
    fetchImage();
  }

  function changeColor() {
    setColorIndex((i) => (i + 1) % TEXT_COLORS.length);
  }

  return (
    <GreetingContext.Provider
      value={{
        text,
        image: { uri: imageUrl } as ImageSourcePropType,
        loading,
        font: FONTS[fontIndex],
        fontSizeOffset,
        textColor: TEXT_COLORS[colorIndex],
        greetingAnimatedStyle,
        fetchGreeting,
        changeFont,
        changeImage,
        changeColor,
        changeFontSize,
      }}
    >
      {children}
    </GreetingContext.Provider>
  );
}

export function useGreetingContext() {
  const ctx = useContext(GreetingContext);
  if (!ctx) throw new Error("useGreetingContext must be used within GreetingProvider");
  return ctx;
}
