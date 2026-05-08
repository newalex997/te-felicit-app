import { memo, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SavedCard, useSavedCards } from "../context/SavedCardsContext";
import { useGreetingContext } from "../context/GreetingContext";
import {
  Card,
  CardOverlay,
  CoverImage,
  DeleteIconButton,
} from "../styles/saved.styles";

type Props = { item: SavedCard };

function SavedCardItem({ item }: Props) {
  const { restoreCard } = useGreetingContext();
  const { removeCard } = useSavedCards();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 24 - 10) / 2;

  const handlePress = useCallback(() => {
    restoreCard(item);
    router.back();
  }, [item, restoreCard]);

  const handleDelete = useCallback(() => {
    removeCard(item.id);
  }, [item.id, removeCard]);

  const imageSource = item.preview
    ? { uri: `data:image/jpeg;base64,${item.preview}` }
    : { uri: item.imageUrl };

  return (
    <Card onPress={handlePress} style={{ width: cardWidth }}>
      <CoverImage source={imageSource} resizeMode="cover" />
      <CardOverlay>
        <DeleteIconButton onPress={handleDelete} hitSlop={8}>
          <Feather name="x" size={14} color="#1a1a2e" />
        </DeleteIconButton>
      </CardOverlay>
    </Card>
  );
}

export default memo(SavedCardItem);
