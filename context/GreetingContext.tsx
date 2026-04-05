import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ViewStyle } from "react-native";
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

export type TextBlockId = "slogan" | "message";

export type TextBlock = {
  id: TextBlockId;
  text: string;
  font: FontEntry;
  color: string;
  fontSizeMultiplier: number;
  animatedStyle: AnimatedStyle<ViewStyle>;
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
  textBlocks: TextBlock[];
  imageUrl: string;
  loading: boolean;
  focusedBlockId: TextBlockId | null;
  fetchCount: number;
  setFocusedBlockId: (id: TextBlockId | null) => void;
  changeFocusedFont: () => void;
  changeFocusedColor: () => void;
  fetchGreeting: () => Promise<void>;
  changeImage: () => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState("");
  const [slogan, setSlogan] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [colorIndexes, setColorIndexes] = useState<Record<TextBlockId, number>>(
    {
      slogan: 0,
      message: 0,
    },
  );
  const [focusedBlockId, setFocusedBlockId] = useState<TextBlockId | null>(
    null,
  );
  const [fontIndexes, setFontIndexes] = useState<Record<TextBlockId, number>>({
    slogan: 0,
    message: 0,
  });

  const sloganOpacity = useSharedValue(1);
  const messageOpacity = useSharedValue(1);

  const fetchGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting();
      setText(data.message);
      setSlogan(data.slogan);
      setImageUrl(data.imageUrl);
      setFontIndexes({ slogan: 0, message: 0 });
      setColorIndexes({ slogan: 0, message: 0 });
      setFetchCount((c) => c + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGreeting();
  }, [fetchGreeting]);

  const sloganAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sloganOpacity.value,
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const advanceSloganFont = useCallback(() => {
    setFontIndexes((prev) => ({
      ...prev,
      slogan: (prev.slogan + 1) % FONTS.length,
    }));
  }, []);

  const advanceMessageFont = useCallback(() => {
    setFontIndexes((prev) => ({
      ...prev,
      message: (prev.message + 1) % FONTS.length,
    }));
  }, []);

  const changeFont = useCallback(
    (id: TextBlockId) => {
      const opacity = id === "slogan" ? sloganOpacity : messageOpacity;
      const advance = id === "slogan" ? advanceSloganFont : advanceMessageFont;
      opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
        if (!finished) return;
        scheduleOnRN(advance);
        opacity.value = withTiming(1, { duration: FADE_DURATION });
      });
    },
    [sloganOpacity, messageOpacity, advanceSloganFont, advanceMessageFont],
  );

  const changeFocusedFont = useCallback(() => {
    if (focusedBlockId) changeFont(focusedBlockId);
  }, [focusedBlockId, changeFont]);

  const changeImage = useCallback(async () => {
    const data = await greetingApi.getImage();
    setImageUrl(data.imageUrl);
  }, []);

  const changeFocusedColor = useCallback(() => {
    if (!focusedBlockId) return;
    setColorIndexes((prev) => ({
      ...prev,
      [focusedBlockId]: (prev[focusedBlockId] + 1) % TEXT_COLORS.length,
    }));
  }, [focusedBlockId]);

  const textBlocks: TextBlock[] = [
    {
      id: "slogan",
      text: slogan,
      font: FONTS[fontIndexes.slogan],
      color: TEXT_COLORS[colorIndexes.slogan],
      fontSizeMultiplier: 2,
      animatedStyle: sloganAnimatedStyle,
    },
    {
      id: "message",
      text,
      font: FONTS[fontIndexes.message],
      color: TEXT_COLORS[colorIndexes.message],
      fontSizeMultiplier: 1,
      animatedStyle: messageAnimatedStyle,
    },
  ];

  return (
    <GreetingContext.Provider
      value={{
        textBlocks,
        imageUrl,
        loading,
        focusedBlockId,
        fetchCount,
        setFocusedBlockId,
        changeFocusedFont,
        changeFocusedColor,
        fetchGreeting,
        changeImage,
      }}
    >
      {children}
    </GreetingContext.Provider>
  );
}

export function useGreetingContext() {
  const ctx = useContext(GreetingContext);
  if (!ctx)
    throw new Error("useGreetingContext must be used within GreetingProvider");
  return ctx;
}
