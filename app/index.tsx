import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useI18n } from "../context/I18nContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import {
  Container,
  Header,
  SectionLabel,
  HeaderActions,
  IconButton,
} from "../styles/index.styles";
import { GreetingCard } from "../components/GreetingCard";
import { ActionButtons } from "../components/ActionButtons";
import { MoodPicker } from "../components/MoodPicker";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { refreshGreeting } = useGreetingContext();
  const { cardStyle, swipe } = useCardSwipe(refreshGreeting);
  const { t } = useI18n();

  return (
    <Container>
      <Header paddingTop={insets.top + 8}>
        <SectionLabel>{t("holidaysLabel")}</SectionLabel>
        <HeaderActions>
          <IconButton onPress={() => router.push("/saved" as never)}>
            <AntDesign name="heart" size={18} color="#fff" />
          </IconButton>
          <IconButton onPress={() => router.push("/settings" as never)}>
            <Feather name="settings" size={18} color="#fff" />
          </IconButton>
        </HeaderActions>
      </Header>
      <MoodPicker />
      <GreetingCard cardStyle={cardStyle} />
      <ActionButtons swipe={swipe} />
    </Container>
  );
}
