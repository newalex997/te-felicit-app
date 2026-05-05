import { styled } from "styled-components/native";

export const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${({ paddingTop }) => paddingTop}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-bottom: ${({ theme }) => theme.space.md}px;
  gap: ${({ theme }) => theme.space.md}px;
`;

export const BackButton = styled.Pressable`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.12);
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 600;
`;

export const SettingsCard = styled.View`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: ${({ theme }) => theme.radii.md}px;
  overflow: hidden;
`;

export const SettingsRowLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
`;

export const SettingsRowDivider = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.07);
  margin-left: ${({ theme }) => theme.space.lg}px;
`;
