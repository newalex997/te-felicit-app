import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_TEXT =
  "Wishing you a wonderful day filled with warmth, joy, and everything that makes you smile.";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Card
        colors={["#667eea", "#764ba2", "#f093fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Greeting>{MOCK_TEXT}</Greeting>
      </Card>

      <Buttons style={{ paddingBottom: insets.bottom + 16 }}>
        <TryAnotherButton onPress={() => {}}>
          <TryAnotherText>Try another</TryAnotherText>
        </TryAnotherButton>

        <ShareButton onPress={() => {}}>
          <ShareText>Share</ShareText>
        </ShareButton>
      </Buttons>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Card = styled(LinearGradient)`
  flex: 1;
  margin: ${({ theme }) => theme.space.lg}px;
  margin-top: 60px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.xxl}px;
`;

const Greeting = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  font-weight: 600;
  text-align: center;
  line-height: 34px;
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space.md}px;
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.lg}px 0;
`;

const TryAnotherButton = styled.Pressable`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg}px 0;
  border-radius: ${({ theme }) => theme.radii.md}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

const TryAnotherText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: 600;
`;

const ShareButton = styled.Pressable`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg}px 0;
  border-radius: ${({ theme }) => theme.radii.md}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ShareText = styled.Text`
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: 600;
`;
