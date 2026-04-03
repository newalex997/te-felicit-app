import { createContext, useContext, useState } from "react";
import { i18n, detectLocale, type SupportedLocale } from "../i18n";
import { setApiLocale } from "../api/client";

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const detected = detectLocale();
    setApiLocale(detected);
    return detected;
  });

  function setLocale(newLocale: SupportedLocale) {
    i18n.locale = newLocale;
    setApiLocale(newLocale);
    setLocaleState(newLocale);
  }

  i18n.locale = locale;

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: (key) => i18n.t(key) }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
