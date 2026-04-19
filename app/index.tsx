import { useCallback } from "react";
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
  const { refreshGreeting, loading, setMood, setHoliday, setFocusedBlockId } = useGreetingContext();
  const { share, sharing } = useShareContext();
  const { cardStyle, swipe: swipeCard } = useCardSwipe(refreshGreeting);
  const { t } = useI18n();

  const swipe = useCallback(() => {
    setFocusedBlockId(null);
    swipeCard();
  }, [setFocusedBlockId, swipeCard]);

  const handleMoodSelect = useCallback(
    ({ mood, holidayMood }: { mood: string | undefined; holidayMood: string | undefined }) => {
      setMood(mood);
      setHoliday(holidayMood);
    },
    [setMood, setHoliday],
  );

  return (
    <Container>
      <MoodPicker onSelect={handleMoodSelect} />
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
