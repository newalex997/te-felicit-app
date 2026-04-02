import { useState, useCallback, useEffect } from "react";
import { greetingApi } from "../api/greeting";

export function useGreeting() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNew = useCallback(async () => {
    setLoading(true);
    try {
      const data = await greetingApi.getGreeting();
      setText(data.message);
      setImageUrl(data.imageUrl);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNew();
  }, [fetchNew]);

  return { text, imageUrl, loading, fetchNew };
}
