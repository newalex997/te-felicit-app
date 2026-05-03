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

const PRIVACY_POLICY_URL = "https://mesajedinsuflet.app/en/privacy-policy";
const TERMS_URL = "https://mesajedinsuflet.app/en/terms-and-conditions";
const CONTACT_US_URL = "https://mesajedinsuflet.app/en/contact-us";

export function AppInfoSection() {
  const { t } = useI18n();

  return (
    <>
      <SectionLabel marginTop={28}>{t("appInfo").toUpperCase()}</SectionLabel>
      <Card>
        <RowPressable onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
          <RowLabel>{t("privacyPolicy")}</RowLabel>
          <Feather
            name="external-link"
            size={16}
            color="rgba(255,255,255,0.45)"
          />
        </RowPressable>
        <RowDivider />
        <RowPressable onPress={() => Linking.openURL(TERMS_URL)}>
          <RowLabel>{t("termsAndConditions")}</RowLabel>
          <Feather
            name="external-link"
            size={16}
            color="rgba(255,255,255,0.45)"
          />
        </RowPressable>
        <RowDivider />
        <RowPressable onPress={() => Linking.openURL(CONTACT_US_URL)}>
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
