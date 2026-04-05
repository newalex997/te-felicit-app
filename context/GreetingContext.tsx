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

const FONT_SIZE_MULTIPLIERS: Record<TextBlockId, number> = {
  slogan: 2,
  message: 1,
};

const FADE_DURATION = 180;

interface GreetingContextValue {
  textBlocks: TextBlock[];
  imageUrl: string;
  loading: boolean;
  focusedBlockId: TextBlockId | null;
  refreshCount: number;
  setFocusedBlockId: (id: TextBlockId | null) => void;
  cycleFocusedFont: () => void;
  cycleFocusedColor: () => void;
  clearFocusedText: () => void;
  refreshGreeting: () => Promise<void>;
  refreshImage: () => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<Record<TextBlockId, string>>({
    slogan: "",
    message: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [colorIndexes, setColorIndexes] = useState<Record<TextBlockId, number>>(
    { slogan: 0, message: 0 },
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

  const opacities: Record<TextBlockId, typeof sloganOpacity> = {
    slogan: sloganOpacity,
    message: messageOpacity,
  };

  const sloganAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sloganOpacity.value,
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const animatedStyles: Record<TextBlockId, AnimatedStyle<ViewStyle>> = {
    slogan: sloganAnimatedStyle,
    message: messageAnimatedStyle,
  };

  const refreshGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting();
      setTexts({ slogan: data.slogan, message: data.message });
      setImageUrl(data.imageUrl);
      setFontIndexes({ slogan: 0, message: 0 });
      setColorIndexes({ slogan: 0, message: 0 });
      setRefreshCount((c) => c + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshGreeting();
  }, [refreshGreeting]);

  const advanceFontForBlock = useCallback((id: TextBlockId) => {
    setFontIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % FONTS.length,
    }));
  }, []);

  const cycleFontForBlock = useCallback(
    (id: TextBlockId) => {
      const opacity = opacities[id];
      opacity.value = withTiming(0, { duration: FADE_DURATION }, (finished) => {
        if (!finished) return;
        scheduleOnRN(() => advanceFontForBlock(id));
        opacity.value = withTiming(1, { duration: FADE_DURATION });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sloganOpacity, messageOpacity, advanceFontForBlock],
  );

  const cycleFocusedFont = useCallback(() => {
    if (focusedBlockId) cycleFontForBlock(focusedBlockId);
  }, [focusedBlockId, cycleFontForBlock]);

  const cycleFocusedColor = useCallback(() => {
    if (!focusedBlockId) return;
    setColorIndexes((prev) => ({
      ...prev,
      [focusedBlockId]: (prev[focusedBlockId] + 1) % TEXT_COLORS.length,
    }));
  }, [focusedBlockId]);

  const clearFocusedText = useCallback(() => {
    if (!focusedBlockId) return;
    setTexts((prev) => ({ ...prev, [focusedBlockId]: "" }));
  }, [focusedBlockId]);

  const refreshImage = useCallback(async () => {
    const data = await greetingApi.getImage();
    setImageUrl(data.imageUrl);
  }, []);

  const textBlocks: TextBlock[] = (
    ["slogan", "message"] as TextBlockId[]
  ).map((id) => ({
    id,
    text: texts[id],
    font: FONTS[fontIndexes[id]],
    color: TEXT_COLORS[colorIndexes[id]],
    fontSizeMultiplier: FONT_SIZE_MULTIPLIERS[id],
    animatedStyle: animatedStyles[id],
  }));

  return (
    <GreetingContext.Provider
      value={{
        textBlocks,
        imageUrl,
        loading,
        focusedBlockId,
        refreshCount,
        setFocusedBlockId,
        cycleFocusedFont,
        cycleFocusedColor,
        clearFocusedText,
        refreshGreeting,
        refreshImage,
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
