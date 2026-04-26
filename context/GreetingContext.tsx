import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { greetingApi } from "../api/greeting";
import { TextBlockConfigDto } from "../api/Api";
import { TextAlign, TextBlockState, TextEffect, useTextBlockState } from "./useTextBlockState";

export type TextBlockId = "slogan" | "message";

export type TextBlock = {
  id: TextBlockId;
  text: string;
  fontFamily: string;
  fontSize: number;
  baseFontSize: number;
  lineHeight: number;
  color: string;
  textEffect: TextEffect;
  textEffectStyle: TextBlockState["textEffectStyle"];
  strokeColor: string | undefined;
  textAlign: TextAlign;
  position: TextBlockConfigDto["position"];
  animatedStyle: TextBlockState["animatedStyle"];
};

interface GreetingContextValue {
  textBlocks: TextBlock[];
  imageUrl: string;
  loading: boolean;
  imageLoading: boolean;
  setImageLoaded: () => void;
  focusedBlockId: TextBlockId | null;
  setFocusedBlockId: (id: TextBlockId | null) => void;
  setBlockText: (id: TextBlockId, text: string) => void;
  cycleBlockFont: () => void;
  cycleBlockColor: () => void;
  cycleBlockTextEffect: () => void;
  cycleBlockTextAlign: () => void;
  setBlockFontSize: (size: number) => void;
  clearBlock: () => void;
  refreshGreeting: () => Promise<void>;
  refreshImage: () => void;
  mood: string | undefined;
  setMood: (mood: string | undefined) => void;
  holiday: string | undefined;
  setHoliday: (holiday: string | undefined) => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<Record<TextBlockId, string>>({
    slogan: "",
    message: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  function updateImageUrl(url: string) {
    setImageUrl(url);
    setImageLoading(true);
  }

  const setImageLoaded = useCallback(() => setImageLoading(false), []);
  const [focusedBlockId, setFocusedBlockId] = useState<TextBlockId | null>(null);

  const [mood, setMood] = useState<string | undefined>(undefined);
  const [holiday, setHoliday] = useState<string | undefined>(undefined);
  const [sloganConfig, setSloganConfig] = useState<TextBlockConfigDto | null>(null);
  const [messageConfig, setMessageConfig] = useState<TextBlockConfigDto | null>(null);

  const sloganState = useTextBlockState(sloganConfig);
  const messageState = useTextBlockState(messageConfig);
  const focusedState =
    focusedBlockId === "slogan" ? sloganState :
    focusedBlockId === "message" ? messageState :
    null;

  const refreshGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting(mood, holiday);
      setTexts({ slogan: data.slogan, message: data.message });
      updateImageUrl(data.imageUrl);
      setSloganConfig(data.textConfig.slogan);
      setMessageConfig(data.textConfig.message);
    } finally {
      setLoading(false);
    }
  }, [mood, holiday]);

  useEffect(() => {
    refreshGreeting();
  }, [refreshGreeting]);

  const cycleBlockFont = useCallback(() => focusedState?.cycleFont(), [focusedState]);
  const cycleBlockColor = useCallback(() => focusedState?.cycleColor(), [focusedState]);
  const cycleBlockTextEffect = useCallback(() => focusedState?.cycleTextEffect(), [focusedState]);
  const cycleBlockTextAlign = useCallback(() => focusedState?.cycleTextAlign(), [focusedState]);
  const setBlockFontSize = useCallback((size: number) => focusedState?.setFontSize(size), [focusedState]);

  const setBlockText = useCallback((id: TextBlockId, text: string) => {
    setTexts((prev) => ({ ...prev, [id]: text }));
  }, []);

  const clearBlock = useCallback(() => {
    if (focusedBlockId) {
      setTexts((prev) => ({ ...prev, [focusedBlockId]: "" }));
      setFocusedBlockId(null);
    }
  }, [focusedBlockId]);

  const refreshImage = useCallback(async () => {
    const data = await greetingApi.getImage(mood, holiday);
    updateImageUrl(data.imageUrl);
  }, [mood, holiday]);

  const buildBlock = (
    id: TextBlockId,
    state: TextBlockState,
    config: TextBlockConfigDto | null,
  ): TextBlock => ({
    id,
    text: texts[id],
    fontFamily: state.fontFamily,
    fontSize: state.fontSize,
    baseFontSize: config?.fontSize ?? 0,
    lineHeight: state.lineHeight,
    color: state.color,
    textEffect: state.textEffect,
    textEffectStyle: state.textEffectStyle,
    strokeColor: state.strokeColor,
    textAlign: state.textAlign,
    position: config?.position ?? "center",
    animatedStyle: state.animatedStyle,
  });

  const textBlocks: TextBlock[] = [
    buildBlock("slogan", sloganState, sloganConfig),
    buildBlock("message", messageState, messageConfig),
  ];

  return (
    <GreetingContext.Provider
      value={{
        textBlocks,
        imageUrl,
        loading,
        imageLoading,
        setImageLoaded,
        focusedBlockId,
        setFocusedBlockId,
        setBlockText,
        cycleBlockFont,
        cycleBlockColor,
        cycleBlockTextEffect,
        cycleBlockTextAlign,
        setBlockFontSize,
        clearBlock,
        refreshGreeting,
        refreshImage,
        mood,
        setMood,
        holiday,
        setHoliday,
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
