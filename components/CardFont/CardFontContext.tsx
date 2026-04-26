import { createContext, useContext, useState } from "react";
import { TextBlockId } from "../../context/GreetingContext";

type CardFontContextValue = {
  editingBlockId: TextBlockId | null;
  setEditingBlockId: (id: TextBlockId | null) => void;
};

const CardFontContext = createContext<CardFontContextValue | null>(null);

export function CardFontProvider({ children }: { children: React.ReactNode }) {
  const [editingBlockId, setEditingBlockId] = useState<TextBlockId | null>(
    null,
  );
  return (
    <CardFontContext.Provider value={{ editingBlockId, setEditingBlockId }}>
      {children}
    </CardFontContext.Provider>
  );
}

export function useCardFontContext() {
  const ctx = useContext(CardFontContext);
  if (!ctx)
    throw new Error("useCardFontContext must be used within CardFontProvider");
  return ctx;
}
