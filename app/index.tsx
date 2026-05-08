import { useCallback } from "react";
import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
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
  const {
    refreshGreeting,
    loading,
    setMood,
    setHoliday,
    setFocusedBlockId,
    mood,
    holiday,
  } = useGreetingContext();
  const { share, sharing } = useShareContext();
  const { cardStyle, swipe: swipeCard } = useCardSwipe(refreshGreeting);
  const { t } = useI18n();

  const swipe = useCallback(() => {
    setFocusedBlockId(null);
    swipeCard();
  }, [setFocusedBlockId, swipeCard]);

  const handleMoodSelect = useCallback(
    ({ mood, holidayMood }: { mood?: string; holidayMood?: string }) => {
      setFocusedBlockId(null);
      setMood(mood);
      setHoliday(holidayMood);
    },
    [setMood, setHoliday, setFocusedBlockId],
  );

  return (
    <Container>
      <Header paddingTop={insets.top + 8}>
        <SectionLabel>{t("holidaysLabel").toUpperCase()}</SectionLabel>
        <HeaderActions>
          <IconButton onPress={() => router.push("/saved" as never)}>
            <AntDesign name="heart" size={17} color="#fff" />
          </IconButton>
          <IconButton onPress={() => router.push("/settings" as never)}>
            <Feather name="settings" size={17} color="#fff" />
          </IconButton>
        </HeaderActions>
      </Header>
      <MoodPicker
        onSelect={handleMoodSelect}
        value={{ mood, holidayMood: holiday }}
      />
      <GreetingCard cardStyle={cardStyle} />
      <ActionButtons
        swipe={swipe}
        loading={loading}
        share={share}
        sharing={sharing}
      />
    </Container>
  );
}
