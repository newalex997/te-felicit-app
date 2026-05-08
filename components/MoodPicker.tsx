import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styled } from "styled-components/native";
import { greetingApi } from "../api/greeting";
import { MoodOptionDto } from "../api/Api";
import { useGreetingContext } from "../context/GreetingContext";
import { useI18n } from "../context/I18nContext";

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

export function MoodPicker() {
  const scrollRef = useRef<ScrollView>(null);
  const { locale } = useI18n();
  const { mood, holiday, setMood, setHoliday, setFocusedBlockId } = useGreetingContext();
  const [selectedMood, setSelectedMood] = useState<string | null>(mood ?? null);
  const [selectedHolidayMood, setSelectedHolidayMood] = useState<string | null>(holiday ?? null);
  const [moods, setMoods] = useState<MoodOptionDto[]>([]);
  const [holidayMoods, setHolidayMoods] = useState<MoodOptionDto[]>([]);

  useEffect(() => {
    greetingApi.getMoods().then((data) => {
      setMoods(data.moods.filter((m) => m.id !== "all"));
      setHolidayMoods(data.holidayMoods);
    });
  }, [locale]);

  useEffect(() => {
    setSelectedMood(mood ?? null);
    setSelectedHolidayMood(holiday ?? null);
  }, [mood, holiday]);

  const notify = useCallback((nextMood: string | null, nextHoliday: string | null) => {
    setFocusedBlockId(null);
    setMood(nextMood ?? undefined);
    setHoliday(nextHoliday ?? undefined);
  }, [setFocusedBlockId, setMood, setHoliday]);

  const handlePressHoliday = useCallback((id: string) => {
    setSelectedMood(null);
    setSelectedHolidayMood(id);
    notify(null, id);
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }, [notify]);

  const handlePressMood = useCallback((id: string) => {
    const next = selectedMood === id ? null : id;
    setSelectedMood(next);
    notify(next, selectedHolidayMood);
  }, [selectedMood, selectedHolidayMood, notify]);

  const handleClear = useCallback(() => {
    setSelectedMood(null);
    setSelectedHolidayMood(null);
    notify(null, null);
  }, [notify]);

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
