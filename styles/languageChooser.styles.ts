import styled from "styled-components/native";

export const Card = styled.View`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
`;

export const Row = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14px;
`;

export const RowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const Flag = styled.Text`
  font-size: 20px;
`;

export const RowLabel = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.07);
  margin-left: 16px;
`;
