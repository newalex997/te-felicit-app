import { ScrollView } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";
import { LanguageChooser } from "../components/LanguageChooser";
import {
  Container,
  Header,
  BackButton,
  Title,
  Content,
  SectionLabel,
  Card,
  Row,
  RowLabel,
  RowValue,
} from "../styles/settings.styles";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  return (
    <Container paddingTop={insets.top + 8}>
      <Header>
        <BackButton onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </BackButton>
        <Title>{t("settings")}</Title>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content paddingBottom={insets.bottom + 24}>
          <SectionLabel>{t("language").toUpperCase()}</SectionLabel>
          <LanguageChooser />

          <SectionLabel marginTop={28}>{t("appInfo").toUpperCase()}</SectionLabel>
          <Card>
            <Row>
              <RowLabel>{t("version")}</RowLabel>
              <RowValue>1.0.4</RowValue>
            </Row>
          </Card>
        </Content>
      </ScrollView>
    </Container>
  );
}
