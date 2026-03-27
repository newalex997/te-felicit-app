import { useState, useCallback } from "react";

const MOCK_GREETINGS = [
  "Îți doresc o zi minunată, plină de căldură, bucurie și tot ce te face să zâmbești.",
  "La mulți ani! Fie ca fiecare zi să îți aducă liniște, iubire și momente de neuitat.",
  "Gândurile mele bune sunt cu tine. Să ai parte de fericire și sănătate din plin!",
  "Îți trimit cele mai calde urări și sper că ziua ta este la fel de frumoasă ca tine.",
  "Să îți fie viața plină de culoare, râsete și oameni care te prețuiesc cu adevărat.",
  "Cu drag îți urez tot ce e mai bun — sănătate, bucurie și vise împlinite!",
  "Fie ca această zi să fie începutul celor mai frumoase momente din viața ta.",
];

function randomGreeting(exclude: string): string {
  const options = MOCK_GREETINGS.filter((g) => g !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGreeting() {
  const [text, setText] = useState(MOCK_GREETINGS[0]);
  const [loading, setLoading] = useState(false);

  const fetchNew = useCallback(async () => {
    setLoading(true);
    await delay(500);
    setText((prev) => randomGreeting(prev));
    setLoading(false);
  }, []);

  return { text, loading, fetchNew };
}
