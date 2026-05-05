import { styled } from "styled-components/native";

export { Container, Header, BackButton, Title } from "./screen.styles";

export const EmptyText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-top: 120px;
  font-size: ${({ theme }) => theme.fontSizes.md}px;
`;

export const ColumnWrapper = { gap: 10 } as const;

export const Card = styled.Pressable`
  height: 200px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  overflow: hidden;
  background-color: #333;
`;

export const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
  padding: ${({ theme }) => theme.space.md}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const CardContent = styled.View`
  flex: 1;
  gap: 2px;
`;

export const SloganText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 600;
`;

export const DateText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-top: ${({ theme }) => theme.space.xs}px;
`;

export const DeleteButton = styled.Pressable`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: rgba(220, 50, 50, 0.75);
  border-radius: ${({ theme }) => theme.space.sm}px;
  margin-left: ${({ theme }) => theme.space.sm}px;
`;

export const DeleteText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 600;
`;

export const CoverImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
