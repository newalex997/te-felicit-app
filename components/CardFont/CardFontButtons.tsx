import { Ionicons } from "@expo/vector-icons";
import { useGreetingContext } from "../../context/GreetingContext";
import { CardButtonGroup, CardIconButton } from "../../app/index.styles";

const GRADIENT_COLORS = ["rgba(0,0,0,0.75)", "rgba(0,0,0,0.3)"] as const;
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 0, y: 1 };

export function CardFontButtons() {
  const {
    focusedBlockId,
    cycleFocusedFont,
    cycleFocusedColor,
    clearFocusedText,
  } = useGreetingContext();

  if (!focusedBlockId) return null;

  return (
    <CardButtonGroup
      colors={GRADIENT_COLORS}
      start={GRADIENT_START}
      end={GRADIENT_END}
    >
      <CardIconButton onPress={cycleFocusedFont}>
        <Ionicons name="text-outline" size={18} color="white" />
      </CardIconButton>

      <CardIconButton onPress={cycleFocusedColor}>
        <Ionicons name="color-palette-outline" size={18} color="white" />
      </CardIconButton>

      <CardIconButton onPress={clearFocusedText}>
        <Ionicons name="trash-outline" size={18} color="white" />
      </CardIconButton>
    </CardButtonGroup>
  );
}
