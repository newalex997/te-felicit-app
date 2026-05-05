import { styled } from "styled-components/native";

export { Container, Header, BackButton, Title } from "./screen.styles";
export { SettingsCard as Card, SettingsRowLabel as RowLabel, SettingsRowDivider as RowDivider } from "./screen.styles";

export const Content = styled.View<{ paddingBottom: number }>`
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-top: ${({ theme }) => theme.space.sm}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;

export const SectionLabel = styled.Text<{ marginTop?: number }>`
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: ${({ theme }) => theme.space.sm}px;
  margin-left: ${({ theme }) => theme.space.xs}px;
  ${({ marginTop }) => marginTop != null ? `margin-top: ${marginTop}px;` : ""}
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space.lg}px;
  padding-right: ${({ theme }) => theme.space.lg}px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowValue = styled.Text`
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
`;
