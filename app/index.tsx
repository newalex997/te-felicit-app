import { useCallback } from "react";
import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useI18n } from "../context/I18nContext";
import { useSavedCards, SavedCard } from "../context/SavedCardsContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { Container, Header, SectionLabel, HeaderActions, IconButton } from "../styles/index.styles";
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
    textBlocks,
    imageUrl,
  } = useGreetingContext();
  const { share, sharing } = useShareContext();
  const { saveCard } = useSavedCards();
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

  const handleSave = useCallback(async () => {
    if (!imageUrl) return;
    const card: SavedCard = {
      id: Date.now().toString(),
      savedAt: Date.now(),
      imageUrl,
      blocks: textBlocks.map((block) => ({
        id: block.id,
        text: block.text,
        fontFamily: block.fontFamily,
        fontSize: block.fontSize,
        color: block.color,
        textEffect: block.textEffect,
        textAlign: block.textAlign,
        position: block.position,
      })),
    };
    await saveCard(card);
  }, [imageUrl, textBlocks, saveCard]);

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
      <MoodPicker onSelect={handleMoodSelect} />
      <GreetingCard cardStyle={cardStyle} onSave={handleSave} />
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
