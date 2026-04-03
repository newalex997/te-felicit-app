import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import en from "./locales/en.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LOCALES = ["en", "ro", "ru", "uk", "it", "fr"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const i18n = new I18n({ en, ro, ru, uk, it, fr });
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export function detectLocale(): SupportedLocale {
  const locales = Localization.getLocales();
  for (const locale of locales) {
    const lang = locale.languageCode ?? "";
    // Map "ua" device tag to "uk" (ISO 639-1 for Ukrainian)
    const mapped = lang === "ua" ? "uk" : lang;
    if (SUPPORTED_LOCALES.includes(mapped as SupportedLocale)) {
      return mapped as SupportedLocale;
    }
  }
  return "en";
}
