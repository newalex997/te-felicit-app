import { AntDesign, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { styled } from "styled-components/native";
import { useGreetingContext } from "../context/GreetingContext";
import { useSavedCards } from "../context/SavedCardsContext";
import { useShareContext } from "../context/ShareContext";

const Group = styled.View`
  gap: 8px;
`;

const Button = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
`;

export function CardImageButtons() {
  const {
    refreshImage,
    isSaved,
    unsaveCard,
    imageUrl,
    textBlocks,
    mood,
    holiday,
    markAsSaved,
  } = useGreetingContext();
  const { saveCard } = useSavedCards();
  const { captureCard } = useShareContext();

  const handleSave = async () => {
    if (!imageUrl) return;

    if (isSaved) {
      unsaveCard();
      return;
    }

    const preview = await captureCard();

    const card = {
      id: Date.now().toString(),
      savedAt: Date.now(),
      imageUrl,
      preview,
      mood,
      holiday,
      blocks: textBlocks,
    };

    await saveCard(card);

    markAsSaved(card.id);
  };

  return (
    <Group>
      <Button onPress={handleSave}>
        {isSaved ? (
          <AntDesign name="heart" size={18} color="#e05c6a" />
        ) : (
          <Feather name="heart" size={18} color="#1a1a2e" />
        )}
      </Button>
      <Button onPress={refreshImage}>
        <Feather name="refresh-cw" size={18} color="#1a1a2e" />
      </Button>
    </Group>
  );
}
