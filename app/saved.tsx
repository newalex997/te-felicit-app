import { useCallback } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useSavedCards, SavedCard } from "../context/SavedCardsContext";
import { useGreetingContext } from "../context/GreetingContext";
import { useI18n } from "../context/I18nContext";
import {
  Container,
  Header,
  BackButton,
  Title,
  EmptyText,
  Card,
  CardOverlay,
  CardContent,
  SloganText,
  DateText,
  DeleteButton,
  DeleteText,
  CoverImage,
  ColumnWrapper,
} from "../styles/saved.styles";

const ListContent = { padding: 12, gap: 12 } as const;

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedCards, removeCard } = useSavedCards();
  const { restoreCard } = useGreetingContext();
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 24 - 10) / 2;

  const handleLoad = useCallback((card: SavedCard) => {
    restoreCard(card);
    router.back();
  }, [restoreCard]);

  const renderItem = useCallback(({ item }: { item: SavedCard }) => {
    const slogan = item.blocks.find((b) => b.id === "slogan");
    const savedDate = new Date(item.savedAt).toLocaleDateString();
    const imageSource = item.preview
      ? { uri: `data:image/jpeg;base64,${item.preview}` }
      : { uri: item.imageUrl };
    return (
      <Card onPress={() => handleLoad(item)} style={{ width: cardWidth }}>
        <CoverImage source={imageSource} resizeMode="cover" />
        <CardOverlay>
          <CardContent>
            {slogan?.text ? (
              <SloganText numberOfLines={2}>{slogan.text}</SloganText>
            ) : null}
            <DateText>{savedDate}</DateText>
          </CardContent>
          <DeleteButton onPress={() => removeCard(item.id)} hitSlop={8}>
            <DeleteText>{t("delete")}</DeleteText>
          </DeleteButton>
        </CardOverlay>
      </Card>
    );
  }, [handleLoad, removeCard, t, cardWidth]);

  return (
    <Container paddingTop={insets.top + 8}>
      <Header>
        <BackButton onPress={() => router.back()} hitSlop={8}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </BackButton>
        <Title>{t("savedCards")}</Title>
      </Header>

      {savedCards.length === 0 ? (
        <EmptyText>{t("noSavedCards")}</EmptyText>
      ) : (
        <FlatList
          data={savedCards}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={ColumnWrapper}
          contentContainerStyle={ListContent}
          renderItem={renderItem}
        />
      )}
    </Container>
  );
}
