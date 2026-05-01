import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TextBlockConfigDto } from "../api/Api";
import { TextAlign, TextEffect } from "./useTextBlockState";

export type SavedCardBlock = {
  id: "slogan" | "message";
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  textEffect: TextEffect;
  textAlign: TextAlign;
  position: TextBlockConfigDto["position"];
};

export type SavedCard = {
  id: string;
  savedAt: number;
  imageUrl: string;
  blocks: SavedCardBlock[];
};

const STORAGE_KEY = "@mesajedinsuflet/saved_cards";

interface SavedCardsContextValue {
  savedCards: SavedCard[];
  saveCard: (card: SavedCard) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
}

const SavedCardsContext = createContext<SavedCardsContextValue | null>(null);

export function SavedCardsProvider({ children }: { children: React.ReactNode }) {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setSavedCards(JSON.parse(data));
    });
  }, []);

  const saveCard = useCallback(
    async (card: SavedCard) => {
      const updated = [card, ...savedCards];
      setSavedCards(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [savedCards],
  );

  const removeCard = useCallback(
    async (id: string) => {
      const updated = savedCards.filter((c) => c.id !== id);
      setSavedCards(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [savedCards],
  );

  return (
    <SavedCardsContext.Provider value={{ savedCards, saveCard, removeCard }}>
      {children}
    </SavedCardsContext.Provider>
  );
}

export function useSavedCards() {
  const ctx = useContext(SavedCardsContext);
  if (!ctx)
    throw new Error("useSavedCards must be used within SavedCardsProvider");
  return ctx;
}
