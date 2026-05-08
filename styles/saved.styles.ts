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
  aspect-ratio: ${2 / 3};
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
  background-color: rgba(0, 0, 0, 0.1);
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

export const DeleteIconButton = styled.Pressable`
  position: absolute;
  top: ${({ theme }) => theme.space.sm}px;
  right: ${({ theme }) => theme.space.sm}px;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
`;

export const CoverImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
