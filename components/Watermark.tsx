import { Image } from "react-native";
import { styled } from "styled-components/native";

const logo = require("../assets/images/icon.png");

const Container = styled.View`
  position: absolute;
  bottom: 10px;
  right: 12px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  opacity: 0.6;
`;

const Logo = styled(Image)`
  width: 14px;
  height: 14px;
  border-radius: 3px;
`;

const Label = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export function Watermark() {
  return (
    <Container pointerEvents="none">
      <Logo source={logo} />
      <Label>mesajedinsuflet</Label>
    </Container>
  );
}
