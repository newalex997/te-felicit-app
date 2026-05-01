import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGreetingContext } from "../context/GreetingContext";
import { useShareContext } from "../context/ShareContext";
import { useI18n } from "../context/I18nContext";
import { useSavedCards, SavedCard } from "../context/SavedCardsContext";
import { useCardSwipe } from "../hooks/useCardSwipe";
import { Container } from "../styles/index.styles";
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
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.sectionLabel}>{t("holidaysLabel").toUpperCase()}</Text>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => router.push("/saved" as never)}
            style={styles.iconButton}
          >
            <AntDesign name="heart" size={17} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/settings" as never)}
            style={styles.iconButton}
          >
            <Feather name="settings" size={17} color="#fff" />
          </Pressable>
        </View>
      </View>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
