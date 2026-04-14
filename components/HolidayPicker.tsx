import { useState } from "react";
import { ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styled } from "styled-components/native";

type Holiday = {
  id: string;
  label: string;
  emoji: string;
  gradient: readonly [string, string];
};

const MOCK_HOLIDAYS: Holiday[] = [
  { id: "all", label: "All", emoji: "✨", gradient: ["#667eea", "#764ba2"] },
  {
    id: "christmas",
    label: "Christmas",
    emoji: "🎄",
    gradient: ["#c0392b", "#1a5c2a"],
  },
  {
    id: "new-year",
    label: "New Year",
    emoji: "🎆",
    gradient: ["#0f0c29", "#302b63"],
  },
  {
    id: "easter",
    label: "Easter",
    emoji: "🐣",
    gradient: ["#f7971e", "#ffd200"],
  },
  {
    id: "valentines",
    label: "Valentine's",
    emoji: "❤️",
    gradient: ["#e8175d", "#ff6b6b"],
  },
  {
    id: "mothers-day",
    label: "Mother's Day",
    emoji: "💐",
    gradient: ["#f093fb", "#f5576c"],
  },
  {
    id: "fathers-day",
    label: "Father's Day",
    emoji: "👔",
    gradient: ["#2c3e50", "#3498db"],
  },
  {
    id: "birthday",
    label: "Birthday",
    emoji: "🎂",
    gradient: ["#fc5c7d", "#6a3093"],
  },
  {
    id: "halloween",
    label: "Halloween",
    emoji: "🎃",
    gradient: ["#232526", "#e67e22"],
  },
  {
    id: "thanksgiving",
    label: "Thanksgiving",
    emoji: "🦃",
    gradient: ["#7b4f12", "#d4a04a"],
  },
];

const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;

const Wrapper = styled.View<{ topInset: number }>`
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${({ topInset }) => topInset + 8}px;
  height: ${({ topInset }) => topInset + 8 + CARD_HEIGHT + 8}px;
`;

const StoryCard = styled.View<{ selected: boolean }>`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 16px;
  overflow: hidden;
  border-width: 2.5px;
  border-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
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
`;

type Props = {
  onSelect?: (id: string) => void;
};

export function HolidayPicker({ onSelect }: Props) {
  const [selected, setSelected] = useState("all");
  const insets = useSafeAreaInsets();

  function handlePress(id: string) {
    setSelected(id);
    onSelect?.(id);
  }

  return (
    <Wrapper topInset={insets.top}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {MOCK_HOLIDAYS.map((holiday) => (
          <Pressable key={holiday.id} onPress={() => handlePress(holiday.id)}>
            <StoryCard selected={holiday.id === selected}>
              <Gradient
                colors={holiday.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <EmojiText>{holiday.emoji}</EmojiText>
                <Label numberOfLines={1}>{holiday.label}</Label>
              </Gradient>
            </StoryCard>
          </Pressable>
        ))}
      </ScrollView>
    </Wrapper>
  );
}
