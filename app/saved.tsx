import { FlatList, Image, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useSavedCards, SavedCard } from "../context/SavedCardsContext";
import { useGreetingContext } from "../context/GreetingContext";

const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: #1a1a2e;
  padding-top: ${({ paddingTop }) => paddingTop}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
  gap: 12px;
`;

const BackButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.12);
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const EmptyText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-top: 120px;
  font-size: 16px;
`;

const ListContent = { padding: 16, gap: 12 } as const;

const Card = styled.Pressable`
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  background-color: #333;
`;

const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  padding: 12px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CardContent = styled.View`
  flex: 1;
  gap: 2px;
`;

const SloganText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
`;

const MessageText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
`;

const DateText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-top: 4px;
`;

const DeleteButton = styled.Pressable`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: rgba(220, 50, 50, 0.75);
  border-radius: 8px;
  margin-left: 8px;
`;

const DeleteText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedCards, removeCard } = useSavedCards();
  const { restoreCard } = useGreetingContext();

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
        <Title>Saved Cards</Title>
      </Header>

      {savedCards.length === 0 ? (
        <EmptyText>No saved cards yet</EmptyText>
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
                <Image
                  source={{ uri: item.imageUrl }}
                  style={StyleSheet.absoluteFillObject}
                  resizeMode="cover"
                />
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
                  <DeleteButton
                    onPress={() => removeCard(item.id)}
                    hitSlop={8}
                  >
                    <DeleteText>Delete</DeleteText>
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
