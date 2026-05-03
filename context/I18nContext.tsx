import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n, resolveLocale, LOCALE_STORAGE_KEY, type SupportedLocale } from "../i18n";
import { setApiLocale } from "../api/client";

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale | null>(null);

  useEffect(() => {
    resolveLocale().then((resolved) => {
      i18n.locale = resolved;
      setApiLocale(resolved);
      setLocaleState(resolved);
    });
  }, []);

  function setLocale(newLocale: SupportedLocale) {
    AsyncStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    i18n.locale = newLocale;
    setApiLocale(newLocale);
    setLocaleState(newLocale);
  }

  if (locale === null) return null;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: (key) => i18n.t(key, { locale }) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
