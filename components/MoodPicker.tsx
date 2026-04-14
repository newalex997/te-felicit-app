import { useState, useEffect } from "react";
import { ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styled } from "styled-components/native";
import { greetingApi, type MoodOptionsResponseDto } from "../api/greeting";

type Mood = MoodOptionsResponseDto["moods"][number] & {
  gradient: readonly [string, string];
};

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
`;

type Props = {
  onSelect?: (id: string) => void;
};

export function MoodPicker({ onSelect }: Props) {
  const [selected, setSelected] = useState("all");
  const [moods, setMoods] = useState<Mood[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    greetingApi.getMoods().then((data) => {
      setMoods(data.moods as Mood[]);
    });
  }, []);

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
        {moods.map((item) => (
          <Pressable key={item.id} onPress={() => handlePress(item.id)}>
            <CardRing selected={item.id === selected}>
              <CardInner>
                <Gradient
                  colors={item.gradient}
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
