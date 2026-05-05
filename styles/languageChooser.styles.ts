import { styled } from "styled-components/native";

export { SettingsCard as Card, SettingsRowLabel as RowLabel, SettingsRowDivider as Divider } from "./screen.styles";

export const Row = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.md}px;
`;

export const Flag = styled.Text`
  font-size: 20px;
`;
