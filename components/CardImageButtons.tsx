import { Feather } from "@expo/vector-icons";
import { useGreetingContext } from "../context/GreetingContext";
import { CardButtonGroup, CardIconButton } from "../styles/index.styles";

const GRADIENT_COLORS = ["rgba(0,0,0,0.45)", "rgba(0,0,0,0.1)"] as const;
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 0, y: 1 };

export function CardImageButtons() {
  const { refreshImage } = useGreetingContext();

  return (
    <CardButtonGroup
      colors={GRADIENT_COLORS}
      start={GRADIENT_START}
      end={GRADIENT_END}
    >
      <CardIconButton onPress={refreshImage}>
        <Feather name="refresh-cw" size={16} color="white" />
      </CardIconButton>
    </CardButtonGroup>
  );
}
