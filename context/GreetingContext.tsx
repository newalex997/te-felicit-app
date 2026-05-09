import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { SavedCard, useSavedCards } from "./SavedCardsContext";

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
  markAsSaved: (id: string) => void;
  unsaveCard: () => void;
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
    baseFontSize: config?.fontSize ?? 1,
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
  const [texts, setTexts] = useState<Record<TextBlockId, string>>({
    slogan: "",
    message: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedCardId, setSavedCardId] = useState<string | null>(null);
  const [focusedBlockId, setFocusedBlockId] = useState<TextBlockId | null>(
    null,
  );
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [holiday, setHoliday] = useState<string | undefined>(undefined);
  const [configs, setConfigs] = useState<
    Record<TextBlockId, BlockConfig | null>
  >({ slogan: null, message: null });

  const { locale } = useI18n();
  const filtersRef = useRef({ mood, holiday });
  filtersRef.current = { mood, holiday };
  const isRestoringRef = useRef(false);

  const { removeCard, savedCards } = useSavedCards();

  const isSaved = useMemo(
    () => savedCardId !== null && savedCards.some((c) => c.id === savedCardId),
    [savedCards, savedCardId],
  );

  function updateImageUrl(url: string) {
    setImageUrl(url);
    setSavedCardId(null);
  }

  const markAsSaved = useCallback((id: string) => setSavedCardId(id), []);
  const unsaveCard = useCallback(() => {
    if (savedCardId) removeCard(savedCardId);
  }, [savedCardId, removeCard]);

  const sloganState = useTextBlockState(configs.slogan);
  const messageState = useTextBlockState(configs.message);
  const blockStates = { slogan: sloganState, message: messageState };
  const focusedState = focusedBlockId ? blockStates[focusedBlockId] : null;

  const refreshGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const { mood, holiday } = filtersRef.current;
      const data = await greetingApi.getGreeting(mood, holiday);
      setTexts({ slogan: data.slogan, message: data.message });
      updateImageUrl(data.imageUrl);
      setConfigs({
        slogan: data.textConfig.slogan,
        message: data.textConfig.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isRestoringRef.current) {
      isRestoringRef.current = false;
      return;
    }
    refreshGreeting();
  }, [mood, holiday, locale, refreshGreeting]);

  const cycleBlockFont = useCallback(
    () => focusedState?.cycleFont(),
    [focusedState],
  );
  const cycleBlockColor = useCallback(
    () => focusedState?.cycleColor(),
    [focusedState],
  );
  const cycleBlockTextEffect = useCallback(
    () => focusedState?.cycleTextEffect(),
    [focusedState],
  );
  const cycleBlockTextAlign = useCallback(
    () => focusedState?.cycleTextAlign(),
    [focusedState],
  );
  const setBlockFontSize = useCallback(
    (size: number) => focusedState?.setFontSize(size),
    [focusedState],
  );

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
    const { mood, holiday } = filtersRef.current;
    const data = await greetingApi.getImage(mood, holiday);
    updateImageUrl(data.imageUrl);
  }, []);

  const restoreCard = useCallback((card: SavedCard) => {
    const { mood: currentMood, holiday: currentHoliday } = filtersRef.current;
    if (card.mood !== currentMood || card.holiday !== currentHoliday) {
      isRestoringRef.current = true;
    }
    setMood(card.mood);
    setHoliday(card.holiday);
    updateImageUrl(card.imageUrl);
    const slogan = card.blocks.find((b) => b.id === "slogan");
    const message = card.blocks.find((b) => b.id === "message");
    setTexts({ slogan: slogan?.text ?? "", message: message?.text ?? "" });
    setConfigs({
      slogan: slogan ? blockToConfig(slogan) : null,
      message: message ? blockToConfig(message) : null,
    });
    setSavedCardId(card.id);
  }, []);

  const textBlocks = useMemo(
    () => [
      buildBlock("slogan", texts, sloganState, configs.slogan),
      buildBlock("message", texts, messageState, configs.message),
    ],
    [texts, sloganState, messageState, configs],
  );

  return (
    <GreetingContext.Provider
      value={{
        textBlocks,
        imageUrl,
        loading,
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
        unsaveCard,
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
