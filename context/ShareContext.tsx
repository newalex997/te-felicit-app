import * as Sharing from "expo-sharing";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { captureRef } from "react-native-view-shot";

interface ShareContextValue {
  cardRef: React.RefObject<null>;
  sharing: boolean;
  share: () => Promise<void>;
}

const ShareContext = createContext<ShareContextValue | null>(null);

export function ShareProvider({ children }: { children: React.ReactNode }) {
  const cardRef = useRef(null);
  const [sharing, setSharing] = useState(false);

  const share = useCallback(async () => {
    if (!cardRef.current || sharing) return;
    setSharing(true);
    try {
      const uri = await captureRef(cardRef, {
        format: "jpg",
        quality: 1,
        fileName: "greeting",
      });

      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        await Sharing.shareAsync(uri, { mimeType: "image/jpeg" });
      }
    } finally {
      setSharing(false);
    }
  }, [sharing]);

  return (
    <ShareContext.Provider value={{ cardRef, sharing, share }}>
      {children}
    </ShareContext.Provider>
  );
}

export function useShareContext() {
  const ctx = useContext(ShareContext);
  if (!ctx)
    throw new Error("useShareContext must be used within ShareProvider");
  return ctx;
}
