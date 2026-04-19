import { Feather } from "@expo/vector-icons";
import { useGreetingContext } from "../context/GreetingContext";
import { CardButtonGroup, CardIconButton } from "../styles/index.styles";
import { CARD_BUTTON_GRADIENT_COLORS, CARD_BUTTON_GRADIENT_END, CARD_BUTTON_GRADIENT_START } from "../constants/gradients";

export function CardImageButtons() {
  const { refreshImage } = useGreetingContext();

  return (
    <CardButtonGroup
      colors={CARD_BUTTON_GRADIENT_COLORS}
      start={CARD_BUTTON_GRADIENT_START}
      end={CARD_BUTTON_GRADIENT_END}
    >
      <CardIconButton onPress={refreshImage}>
        <Feather name="refresh-cw" size={16} color="white" />
      </CardIconButton>
    </CardButtonGroup>
  );
}
