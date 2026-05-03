import { useEffect, useState } from "react";
import * as Network from "expo-network";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const state = await Network.getNetworkStateAsync();
      if (!cancelled) {
        const next = state.isConnected ?? true;
        setIsConnected((prev) => (prev === next ? prev : next));
      }
    }

    check();

    const interval = setInterval(check, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { isConnected };
}
