import { useState, useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styled } from "styled-components/native";
import { greetingApi } from "../api/greeting";
import { MoodOptionDto } from "@/api/Api";

export type MoodSelection = { mood?: string; holidayMood?: string };

type Props = {
  onSelect?: (selection: MoodSelection) => void;
};

const Row = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 8, gap: 8, alignItems: "center" },
})`
  flex-grow: 0;
  flex-shrink: 0;
`;

const Pill = styled.Pressable<{ selected?: boolean }>`
  padding: 10px 16px;
  border-radius: 100px;
  background-color: ${({ selected }) =>
    selected ? "#fff" : "rgba(255,255,255,0.12)"};
`;

const PillText = styled.Text<{ selected?: boolean }>`
  color: ${({ selected, theme }) => (selected ? theme.colors.textInverse : theme.colors.text)};
  font-size: 14px;
  font-weight: 600;
`;

const Divider = styled.View`
  width: 1px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
`;

const ClearButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.15);
  align-items: center;
  justify-content: center;
`;

export function MoodPicker({ onSelect }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedHolidayMood, setSelectedHolidayMood] = useState<string | null>(null);
  const [moods, setMoods] = useState<MoodOptionDto[]>([]);
  const [holidayMoods, setHolidayMoods] = useState<MoodOptionDto[]>([]);

  useEffect(() => {
    greetingApi.getMoods().then((data) => {
      setMoods(data.moods.filter((m) => m.id !== "all"));
      setHolidayMoods(data.holidayMoods);
    });
  }, []);

  function notify(mood: string | null, holidayMood: string | null) {
    onSelect?.({ mood: mood ?? undefined, holidayMood: holidayMood ?? undefined });
  }

  function handlePressHoliday(id: string) {
    setSelectedMood(null);
    setSelectedHolidayMood(id);
    notify(null, id);
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }

  function handlePressMood(id: string) {
    const next = selectedMood === id ? null : id;
    setSelectedMood(next);
    notify(next, selectedHolidayMood);
  }

  function handleClear() {
    setSelectedMood(null);
    setSelectedHolidayMood(null);
    notify(null, null);
  }

  const activeHoliday = holidayMoods.find((m) => m.id === selectedHolidayMood) ?? null;

  return (
    <Row ref={scrollRef}>
      {activeHoliday ? (
        <>
          <ClearButton onPress={handleClear}>
            <Feather name="x" size={14} color="#fff" />
          </ClearButton>

          <Pill selected>
            <PillText selected>{activeHoliday.emoji} {activeHoliday.label}</PillText>
          </Pill>

          <Divider />

          {moods.map((item) => {
            const selected = item.id === selectedMood;
            return (
              <Pill key={item.id} selected={selected} onPress={() => handlePressMood(item.id)}>
                <PillText selected={selected}>{item.emoji} {item.label}</PillText>
              </Pill>
            );
          })}
        </>
      ) : (
        holidayMoods.map((item) => (
          <Pill key={item.id} onPress={() => handlePressHoliday(item.id)}>
            <PillText>{item.emoji} {item.label}</PillText>
          </Pill>
        ))
      )}
    </Row>
  );
}
