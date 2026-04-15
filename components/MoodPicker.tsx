import { useState, useEffect } from "react";
import { ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styled } from "styled-components/native";
import { greetingApi } from "../api/greeting";
import { MoodOptionDto } from "@/api/Api";

const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;

const Wrapper = styled.View<{ topInset: number }>`
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${({ topInset }) => topInset + 8}px;
  height: ${({ topInset }) => topInset + 8 + CARD_HEIGHT + 8}px;
`;

const CardRing = styled.View<{ selected: boolean }>`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 16px;
  border-width: 2.5px;
  border-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
`;

const HolidaySeparator = styled.View`
  width: 18px;
  height: ${CARD_HEIGHT / 2}px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

const SeparatorLine = styled.View`
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: rgba(255, 215, 0, 0.35);
`;

const CardInner = styled.View`
  flex: 1;
  border-radius: 13.5px;
  overflow: hidden;
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 10px;
`;

const EmojiText = styled.Text`
  font-size: 32px;
`;

const Label = styled.Text`
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  padding-left: 6px;
  padding-right: 6px;
`;

export type MoodSelection = { mood?: string; holidayMood?: string };

type Props = {
  onSelect?: (selection: MoodSelection) => void;
};

export function MoodPicker({ onSelect }: Props) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedHolidayMood, setSelectedHolidayMood] = useState<string | null>(
    null,
  );
  const [allCard, setAllCard] = useState<MoodOptionDto | null>(null);
  const [moods, setMoods] = useState<MoodOptionDto[]>([]);
  const [holidayMoods, setHolidayMoods] = useState<MoodOptionDto[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    greetingApi.getMoods().then((data) => {
      const all = data.moods.find((m) => m.id === "all") ?? null;
      setAllCard(all);
      setMoods(data.moods.filter((m) => m.id !== "all"));
      setHolidayMoods(data.holidayMoods);
    });
  }, []);

  function notify(mood: string | null, holidayMood: string | null) {
    onSelect?.({
      mood: mood ?? undefined,
      holidayMood: holidayMood ?? undefined,
    });
  }

  function handlePressAll() {
    setSelectedMood(null);
    setSelectedHolidayMood(null);
    notify(null, null);
  }

  function handlePressMood(id: string) {
    const next = selectedMood === id ? null : id;
    setSelectedMood(next);
    notify(next, selectedHolidayMood);
  }

  function handlePressHolidayMood(id: string) {
    const next = selectedHolidayMood === id ? null : id;
    setSelectedHolidayMood(next);
    notify(selectedMood, next);
  }

  const isAllSelected = selectedMood === null && selectedHolidayMood === null;

  return (
    <Wrapper topInset={insets.top}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {allCard && (
          <Pressable onPress={handlePressAll}>
            <CardRing selected={isAllSelected}>
              <CardInner>
                <Gradient
                  colors={allCard.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <EmojiText>{allCard.emoji}</EmojiText>
                  <Label numberOfLines={2}>{allCard.label}</Label>
                </Gradient>
              </CardInner>
            </CardRing>
          </Pressable>
        )}

        {holidayMoods.length > 0 && (
          <>
            <HolidaySeparator>
              <SeparatorLine />
            </HolidaySeparator>

            {holidayMoods.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handlePressHolidayMood(item.id)}
              >
                <CardRing selected={item.id === selectedHolidayMood}>
                  <CardInner>
                    <Gradient
                      colors={item.gradient as [string, string]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <EmojiText>{item.emoji}</EmojiText>
                      <Label numberOfLines={2}>{item.label}</Label>
                    </Gradient>
                  </CardInner>
                </CardRing>
              </Pressable>
            ))}

            <HolidaySeparator>
              <SeparatorLine />
            </HolidaySeparator>
          </>
        )}

        {moods.map((item) => (
          <Pressable key={item.id} onPress={() => handlePressMood(item.id)}>
            <CardRing selected={item.id === selectedMood}>
              <CardInner>
                <Gradient
                  colors={item.gradient as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <EmojiText>{item.emoji}</EmojiText>
                  <Label numberOfLines={1}>{item.label}</Label>
                </Gradient>
              </CardInner>
            </CardRing>
          </Pressable>
        ))}
      </ScrollView>
    </Wrapper>
  );
}
