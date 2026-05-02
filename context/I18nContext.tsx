import { createContext, useContext, useState, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n, detectLocale, SUPPORTED_LOCALES, type SupportedLocale } from "../i18n";
import { setApiLocale } from "../api/client";
import { triggerAppRestart } from "../utils/restartApp";

const LOCALE_KEY = "@language_preference";

export type LocalePreference = SupportedLocale | "system";

interface I18nContextValue {
  locale: SupportedLocale;
  localePreference: LocalePreference;
  setLocalePreference: (pref: LocalePreference) => Promise<void>;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function applyLocale(locale: SupportedLocale) {
  i18n.locale = locale;
  setApiLocale(locale);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [localePreference, setLocalePreferenceState] = useState<LocalePreference>("system");
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    const sys = detectLocale();
    applyLocale(sys);
    return sys;
  });

  // Load persisted preference once on mount
  useEffect(() => {
    AsyncStorage.getItem(LOCALE_KEY).then((stored) => {
      if (stored && stored !== "system" && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
        const pref = stored as SupportedLocale;
        setLocalePreferenceState(pref);
        setLocale(pref);
        applyLocale(pref);
      }
      // null or "system" → keep the already-detected locale
    });
  }, []);

  // Re-sync with phone language when app comes to foreground (only if system preference)
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state: AppStateStatus) => {
      if (state === "active" && localePreference === "system") {
        const sys = detectLocale();
        setLocale(sys);
        applyLocale(sys);
      }
    });
    return () => sub.remove();
  }, [localePreference]);

  async function setLocalePreference(pref: LocalePreference) {
    await AsyncStorage.setItem(LOCALE_KEY, pref);
    triggerAppRestart();
  }

  return (
    <I18nContext.Provider value={{ locale, localePreference, setLocalePreference, t: (key) => i18n.t(key) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
