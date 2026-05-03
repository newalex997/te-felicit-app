import styled from "styled-components/native";

export { Container, Header, BackButton, Title } from "./screen.styles";

export const Content = styled.View<{ paddingBottom: number }>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;

export const SectionLabel = styled.Text<{ marginTop?: number }>`
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
  margin-left: 4px;
  ${({ marginTop }) => marginTop != null ? `margin-top: ${marginTop}px;` : ""}
`;

export const Card = styled.View`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowDivider = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.07);
  margin-left: 16px;
`;

export const RowLabel = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const RowValue = styled.Text`
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
`;
