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
  const { locale, setLocale } = useI18n();

  return (
    <Card>
      {SUPPORTED_LOCALES.map((lang, index) => {
        const isLast = index === SUPPORTED_LOCALES.length - 1;
        return (
          <React.Fragment key={lang}>
            <Row onPress={() => setLocale(lang)}>
              <RowLeft>
                <Flag>{LANGUAGE_FLAGS[lang]}</Flag>
                <RowLabel>{LANGUAGE_LABELS[lang]}</RowLabel>
              </RowLeft>
              {locale === lang && <Feather name="check" size={18} color="#fff" />}
            </Row>
            {!isLast && <Divider />}
          </React.Fragment>
        );
      })}
    </Card>
  );
}
