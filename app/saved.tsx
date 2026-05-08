import { useCallback } from "react";
import { FlatList } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useSavedCards, SavedCard } from "../context/SavedCardsContext";
import { useI18n } from "../context/I18nContext";
import SavedCardItem from "../components/SavedCardItem";
import {
  Container,
  Header,
  BackButton,
  Title,
  EmptyText,
  ColumnWrapper,
} from "../styles/saved.styles";

const ListContent = { padding: 12, gap: 12 } as const;

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedCards } = useSavedCards();
  const { t } = useI18n();

  const renderItem = useCallback(({ item }: { item: SavedCard }) => (
    <SavedCardItem item={item} />
  ), []);

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
