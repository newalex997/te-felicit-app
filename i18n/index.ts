import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";
import it from "./locales/it.json";

export const SUPPORTED_LOCALES = ["en", "ro", "ru", "it"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const i18n = new I18n({ en, ro, ru, it });
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export const LOCALE_STORAGE_KEY = "@locale";

export function detectLocale(): SupportedLocale {
  const locales = Localization.getLocales();
  for (const locale of locales) {
    const lang = locale.languageCode ?? "";
    if (SUPPORTED_LOCALES.includes(lang as SupportedLocale)) {
      return lang as SupportedLocale;
    }
  }
  return "en";
}

export async function resolveLocale(): Promise<SupportedLocale> {
  const saved = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
    return saved as SupportedLocale;
  }
  return detectLocale();
}
