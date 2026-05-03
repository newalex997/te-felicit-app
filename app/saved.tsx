import { FlatList } from "react-native";
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
  MessageText,
  DateText,
  DeleteButton,
  DeleteText,
  CoverImage,
} from "../styles/saved.styles";

const ListContent = { padding: 16, gap: 12 } as const;

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedCards, removeCard } = useSavedCards();
  const { restoreCard } = useGreetingContext();
  const { t } = useI18n();

  function handleLoad(card: SavedCard) {
    restoreCard(card);
    router.back();
  }

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
          contentContainerStyle={ListContent}
          renderItem={({ item }) => {
            const slogan = item.blocks.find((b) => b.id === "slogan");
            const message = item.blocks.find((b) => b.id === "message");
            const savedDate = new Date(item.savedAt).toLocaleDateString();
            return (
              <Card onPress={() => handleLoad(item)}>
                <CoverImage source={{ uri: item.imageUrl }} resizeMode="cover" />
                <CardOverlay>
                  <CardContent>
                    {slogan?.text ? (
                      <SloganText numberOfLines={1}>{slogan.text}</SloganText>
                    ) : null}
                    {message?.text ? (
                      <MessageText numberOfLines={2}>{message.text}</MessageText>
                    ) : null}
                    <DateText>{savedDate}</DateText>
                  </CardContent>
                  <DeleteButton onPress={() => removeCard(item.id)} hitSlop={8}>
                    <DeleteText>{t("delete")}</DeleteText>
                  </DeleteButton>
                </CardOverlay>
              </Card>
            );
          }}
        />
      )}
    </Container>
  );
}
