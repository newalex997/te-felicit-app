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
  border-radius: ${({ theme }) => theme.radii.md}px;
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


export const CardIconButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
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

export const Header = styled.View<{ paddingTop: number }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-bottom: ${({ theme }) => theme.space.sm}px;
  padding-top: ${({ paddingTop }) => paddingTop}px;
`;

export const SectionLabel = styled.Text`
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm}px;
`;

export const IconButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.15);
  align-items: center;
  justify-content: center;
`;
