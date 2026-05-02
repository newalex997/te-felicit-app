import styled from "styled-components/native";

export const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: #1a1a2e;
  padding-top: ${({ paddingTop }) => paddingTop}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
  gap: 12px;
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
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

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

export const RowLabel = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const RowValue = styled.Text`
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
`;
