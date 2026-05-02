import React from "react";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../i18n";
import { Card, Row, RowLeft, Flag, RowLabel, Divider } from "../styles/languageChooser.styles";

const LANGUAGE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ro: "Română",
  ru: "Русский",
  it: "Italiano",
};

const LANGUAGE_FLAGS: Record<SupportedLocale, string> = {
  en: "🇬🇧",
  ro: "🇷🇴",
  ru: "🇷🇺",
  it: "🇮🇹",
};

export function LanguageChooser() {
  const { locale, setLocalePreference } = useI18n();

  return (
    <Card>
      {SUPPORTED_LOCALES.map((lang, index) => {
        const selected = locale === lang;
        const isLast = index === SUPPORTED_LOCALES.length - 1;
        const option = { key: lang, label: LANGUAGE_LABELS[lang], flag: LANGUAGE_FLAGS[lang] };
        return (
          <React.Fragment key={option.key}>
            <Row onPress={() => setLocalePreference(option.key)}>
              <RowLeft>
                <Flag>{option.flag}</Flag>
                <RowLabel>{option.label}</RowLabel>
              </RowLeft>
              {selected && <Feather name="check" size={18} color="#fff" />}
            </Row>
            {!isLast && <Divider />}
          </React.Fragment>
        );
      })}
    </Card>
  );
}
