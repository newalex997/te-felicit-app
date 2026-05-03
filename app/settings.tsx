import { ScrollView } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";
import { LanguageChooser } from "../components/LanguageChooser";
import { AppInfoSection } from "../components/AppInfoSection";
import {
  Container,
  Header,
  BackButton,
  Title,
  Content,
  SectionLabel,
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

          <AppInfoSection />
        </Content>
      </ScrollView>
    </Container>
  );
}
