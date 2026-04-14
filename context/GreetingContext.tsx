import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { greetingApi } from "../api/greeting";
import { TextBlockConfigDto } from "../api/Api";
import { FontEntry, TextBlockState, useTextBlockState } from "./useTextBlockState";

export type TextBlockId = "slogan" | "message";

export type TextBlock = {
  id: TextBlockId;
  text: string;
  font: FontEntry;
  fontSize: number;
  lineHeight: number;
  color: string;
  position: TextBlockConfigDto["position"];
  animatedStyle: TextBlockState["animatedStyle"];
};

interface GreetingContextValue {
  textBlocks: TextBlock[];
  imageUrl: string;
  loading: boolean;
  focusedBlockId: TextBlockId | null;
  setFocusedBlockId: (id: TextBlockId | null) => void;
  cycleBlockFont: () => void;
  cycleBlockColor: () => void;
  clearBlock: () => void;
  refreshGreeting: () => Promise<void>;
  refreshImage: () => void;
  mood: string | undefined;
  setMood: (mood: string | undefined) => void;
}

const GreetingContext = createContext<GreetingContextValue | null>(null);

export function GreetingProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<Record<TextBlockId, string>>({
    slogan: "",
    message: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState<TextBlockId | null>(null);
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [sloganConfig, setSloganConfig] = useState<TextBlockConfigDto | null>(null);
  const [messageConfig, setMessageConfig] = useState<TextBlockConfigDto | null>(null);

  const sloganState = useTextBlockState(sloganConfig);
  const messageState = useTextBlockState(messageConfig);

  const refreshGreeting = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting(mood);
      setTexts({ slogan: data.slogan, message: data.message });
      setImageUrl(data.imageUrl);
      setSloganConfig(data.textConfig.slogan);
      setMessageConfig(data.textConfig.message);
    } finally {
      setLoading(false);
    }
  }, [mood]);

  useEffect(() => {
    refreshGreeting();
  }, [refreshGreeting]);

  const cycleBlockFont = useCallback(() => {
    if (focusedBlockId === "slogan") sloganState.cycleFont();
    else if (focusedBlockId === "message") messageState.cycleFont();
  }, [focusedBlockId, sloganState, messageState]);

  const cycleBlockColor = useCallback(() => {
    if (focusedBlockId === "slogan") sloganState.cycleColor();
    else if (focusedBlockId === "message") messageState.cycleColor();
  }, [focusedBlockId, sloganState, messageState]);

  const clearBlock = useCallback(() => {
    if (focusedBlockId) setTexts((prev) => ({ ...prev, [focusedBlockId]: "" }));
  }, [focusedBlockId]);

  const refreshImage = useCallback(async () => {
    const data = await greetingApi.getImage();
    setImageUrl(data.imageUrl);
  }, []);

  const buildBlock = (
    id: TextBlockId,
    state: TextBlockState,
    config: TextBlockConfigDto | null,
  ): TextBlock => ({
    id,
    text: texts[id],
    font: state.font,
    fontSize: state.fontSize,
    lineHeight: state.lineHeight,
    color: state.color,
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
        focusedBlockId,
        setFocusedBlockId,
        cycleBlockFont,
        cycleBlockColor,
        clearBlock,
        refreshGreeting,
        refreshImage,
        mood,
        setMood,
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
