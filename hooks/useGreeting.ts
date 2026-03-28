import { useState, useCallback, useEffect } from "react";
import { greetingApi } from "../api/greeting";

export function useGreeting() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNew = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getMessage();
      setText(data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNew();
  }, [fetchNew]);

  return { text, loading, fetchNew };
}
