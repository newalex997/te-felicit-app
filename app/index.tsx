import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useI18n } from "../context/I18nContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { Container } from "../styles/index.styles";
import { GreetingCard } from "../components/GreetingCard";
import { ActionButtons } from "../components/ActionButtons";
import { MoodPicker } from "../components/MoodPicker";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { refreshGreeting, loading, setMood, setHoliday } = useGreetingContext();
  const { share, sharing } = useShareContext();
  const { cardStyle, swipe } = useCardSwipe(refreshGreeting);
  const { t } = useI18n();

  return (
    <Container>
      <MoodPicker onSelect={({ mood, holidayMood }) => { setMood(mood); setHoliday(holidayMood); }} />
      <GreetingCard cardStyle={cardStyle} />
      <ActionButtons
        swipe={swipe}
        loading={loading}
        share={share}
        sharing={sharing}
        t={t}
        paddingBottom={insets.bottom + 16}
      />
    </Container>
  );
}
