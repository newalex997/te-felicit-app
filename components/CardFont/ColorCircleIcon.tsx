import { styled } from "styled-components/native";

const Circle = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  overflow: hidden;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Quadrant = styled.View<{ color: string }>`
  width: 9px;
  height: 9px;
  background-color: ${({ color }) => color};
`;

export function ColorCircleIcon() {
  return (
    <Circle>
      <Quadrant color="#FF6B6B" />
      <Quadrant color="#FFD93D" />
      <Quadrant color="#6BCB77" />
      <Quadrant color="#4D96FF" />
    </Circle>
  );
}
