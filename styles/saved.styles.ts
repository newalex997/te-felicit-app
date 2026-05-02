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

export const EmptyText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-top: 120px;
  font-size: 16px;
`;

export const Card = styled.Pressable`
  height: 180px;
  border-radius: 14px;
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
  padding: 12px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const CardContent = styled.View`
  flex: 1;
  gap: 2px;
`;

export const SloganText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
`;

export const MessageText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
`;

export const DateText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-top: 4px;
`;

export const DeleteButton = styled.Pressable`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: rgba(220, 50, 50, 0.75);
  border-radius: 8px;
  margin-left: 8px;
`;

export const DeleteText = styled.Text`
  color: #fff;
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
