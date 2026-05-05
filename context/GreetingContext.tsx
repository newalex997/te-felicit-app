import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { greetingApi } from "../api/greeting";
import { TextBlockConfigDto } from "../api/Api";
import { useI18n } from "./I18nContext";
import {
  BlockConfig,
  TextAlign,
  TextBlockState,
  TextEffect,
  useTextBlockState,
} from "./useTextBlockState";
import { SavedCard } from "./SavedCardsContext";

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
  restoreCard: (card: SavedCard) => void;
  isSaved: boolean;
  markAsSaved: () => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

function blockToConfig(block: SavedCard["blocks"][number]): BlockConfig {
  return {
    fontSize: block.fontSize,
    color: block.color,
    textEffect: block.textEffect,
    position: block.position,
    fontFamily: block.fontFamily,
    textAlign: block.textAlign,
  };
}

function buildBlock(
  id: TextBlockId,
  texts: Record<TextBlockId, string>,
  state: TextBlockState,
  config: TextBlockConfigDto | null,
): TextBlock {
  return {
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
  };
}

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<Record<TextBlockId, string>>({ slogan: "", message: "" });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState<TextBlockId | null>(null);

  const { locale } = useI18n();
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [holiday, setHoliday] = useState<string | undefined>(undefined);
  const [sloganConfig, setSloganConfig] = useState<BlockConfig | null>(null);
  const [messageConfig, setMessageConfig] = useState<BlockConfig | null>(null);

  const moodRef = useRef(mood);
  const holidayRef = useRef(holiday);
  moodRef.current = mood;
  holidayRef.current = holiday;
  const isRestoringRef = useRef(false);

  function updateImageUrl(url: string) {
    setImageUrl(url);
    setImageLoading(true);
    setIsSaved(false);
  }

  const setImageLoaded = useCallback(() => setImageLoading(false), []);
  const markAsSaved = useCallback(() => setIsSaved(true), []);

  const sloganState = useTextBlockState(sloganConfig);
  const messageState = useTextBlockState(messageConfig);
  const focusedState =
    focusedBlockId === "slogan"
      ? sloganState
      : focusedBlockId === "message"
        ? messageState
        : null;

  const refreshGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting(moodRef.current, holidayRef.current);
      setTexts({ slogan: data.slogan, message: data.message });
      updateImageUrl(data.imageUrl);
      setSloganConfig(data.textConfig.slogan);
      setMessageConfig(data.textConfig.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isRestoringRef.current) {
      isRestoringRef.current = false;
      return;
    }
    refreshGreeting();
  }, [mood, holiday, locale]);

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
    const data = await greetingApi.getImage(moodRef.current, holidayRef.current);
    updateImageUrl(data.imageUrl);
  }, []);

  const restoreCard = useCallback((card: SavedCard) => {
    if (card.mood !== moodRef.current || card.holiday !== holidayRef.current) {
      isRestoringRef.current = true;
    }
    setMood(card.mood);
    setHoliday(card.holiday);
    updateImageUrl(card.imageUrl);
    const slogan = card.blocks.find((b) => b.id === "slogan");
    const message = card.blocks.find((b) => b.id === "message");
    setTexts({ slogan: slogan?.text ?? "", message: message?.text ?? "" });
    if (slogan) setSloganConfig(blockToConfig(slogan));
    if (message) setMessageConfig(blockToConfig(message));
    setIsSaved(true);
  }, []);

  const textBlocks = useMemo(
    () => [
      buildBlock("slogan", texts, sloganState, sloganConfig),
      buildBlock("message", texts, messageState, messageConfig),
    ],
    [texts, sloganState, messageState, sloganConfig, messageConfig],
  );

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
        restoreCard,
        isSaved,
        markAsSaved,
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
