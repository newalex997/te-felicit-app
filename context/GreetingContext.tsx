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
  greetingAnimatedStyle: AnimatedStyle<ViewStyle>;
  fetchGreeting: () => Promise<void>;
  fetchMessage: () => Promise<void>;
  fetchImage: () => Promise<void>;
  changeFont: () => void;
  changeImage: () => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
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

  const fetchMessage = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getMessage();
      setText(data.message);
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
  }, []);

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

  return (
    <GreetingContext.Provider
      value={{
        text,
        image: { uri: imageUrl } as ImageSourcePropType,
        loading,
        font: FONTS[fontIndex],
        greetingAnimatedStyle,
        fetchGreeting,
        fetchMessage,
        fetchImage,
        changeFont,
        changeImage,
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
