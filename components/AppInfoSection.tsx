import { Linking } from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";
import {
  SectionLabel,
  Card,
  Row,
  RowPressable,
  RowDivider,
  RowLabel,
  RowValue,
} from "../styles/settings.styles";

const BASE_URL = "https://mesajedinsuflet.app";

export function AppInfoSection() {
  const { t, locale } = useI18n();
  const privacyPolicyUrl = `${BASE_URL}/${locale}/privacy-policy`;
  const termsUrl = `${BASE_URL}/${locale}/terms-and-conditions`;
  const contactUsUrl = `${BASE_URL}/${locale}/contact-us`;

  return (
    <>
      <SectionLabel marginTop={28}>{t("appInfo").toUpperCase()}</SectionLabel>
      <Card>
        <RowPressable onPress={() => Linking.openURL(privacyPolicyUrl)}>
          <RowLabel>{t("privacyPolicy")}</RowLabel>
          <Feather
            name="external-link"
            size={16}
            color="rgba(255,255,255,0.45)"
          />
        </RowPressable>
        <RowDivider />
        <RowPressable onPress={() => Linking.openURL(termsUrl)}>
          <RowLabel>{t("termsAndConditions")}</RowLabel>
          <Feather
            name="external-link"
            size={16}
            color="rgba(255,255,255,0.45)"
          />
        </RowPressable>
        <RowDivider />
        <RowPressable onPress={() => Linking.openURL(contactUsUrl)}>
          <RowLabel>{t("contactUs")}</RowLabel>
          <Feather
            name="external-link"
            size={16}
            color="rgba(255,255,255,0.45)"
          />
        </RowPressable>
        <RowDivider />
        <Row>
          <RowLabel>{t("version")}</RowLabel>
          <RowValue>{Constants.expoConfig?.version}</RowValue>
        </Row>
      </Card>
    </>
  );
}
