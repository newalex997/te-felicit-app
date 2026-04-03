import { styled } from "styled-components/native";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardFrame = styled.View`
  flex: 1;
  margin: ${({ theme }) => theme.space.lg}px;
  margin-top: 60px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  overflow: hidden;
`;

export const Card = styled(ImageBackground)`
  flex: 1;
`;

export const CardOverlay = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.xxl}px;
`;

export const CardButtons = styled(LinearGradient)`
  position: absolute;
  top: ${({ theme }) => 60 + theme.space.md}px;
  right: ${({ theme }) => theme.space.lg + theme.space.md}px;
  gap: ${({ theme }) => theme.space.sm}px;
  padding: ${({ theme }) => theme.space.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
`;

export const CardIconButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;

export const Greeting = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: GreatVibes_400Regular;
  font-size: 32px;
  text-align: center;
  line-height: 44px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space.md}px;
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.lg}px
    0;
`;

export const TryAnotherButton = styled.Pressable`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg}px 0;
  border-radius: ${({ theme }) => theme.radii.md}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const TryAnotherText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: 600;
`;

export const ShareButton = styled.Pressable`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg}px 0;
  border-radius: ${({ theme }) => theme.radii.md}px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ShareText = styled.Text`
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: 600;
`;
