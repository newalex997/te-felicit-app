import { Ionicons } from "@expo/vector-icons";
import { useGreetingContext } from "../../context/GreetingContext";
import { CardButtonGroup, CardIconButton } from "../../styles/index.styles";
import { CARD_BUTTON_GRADIENT_COLORS, CARD_BUTTON_GRADIENT_END, CARD_BUTTON_GRADIENT_START } from "../../constants/gradients";
import { ColorCircleIcon } from "./ColorCircleIcon";
import { FontSizeSlider } from "./FontSizeSlider";

export function CardFontButtons() {
  const {
    focusedBlockId,
    textBlocks,
    cycleBlockFont,
    cycleBlockColor,
    cycleBlockTextEffect,
    setBlockFontSize,
    clearBlock,
  } = useGreetingContext();

  if (!focusedBlockId) return null;

  const focusedBlock = textBlocks.find((b) => b.id === focusedBlockId);
  const textEffectActive = focusedBlock?.textEffect !== "none";
  const currentFontSize = focusedBlock?.fontSize ?? 0;
  const baseFontSize = focusedBlock?.baseFontSize ?? 0;

  return (
    <CardButtonGroup
      colors={CARD_BUTTON_GRADIENT_COLORS}
      start={CARD_BUTTON_GRADIENT_START}
      end={CARD_BUTTON_GRADIENT_END}
    >
      <CardIconButton onPress={cycleBlockFont}>
        <Ionicons name="text-outline" size={18} color="white" />
      </CardIconButton>

      <CardIconButton onPress={cycleBlockColor}>
        <ColorCircleIcon />
      </CardIconButton>

      <CardIconButton
        onPress={cycleBlockTextEffect}
        style={
          textEffectActive
            ? { backgroundColor: "rgba(255,255,255,0.45)" }
            : undefined
        }
      >
        <Ionicons name="sparkles-outline" size={18} color="white" />
      </CardIconButton>

      <FontSizeSlider value={currentFontSize} baseFontSize={baseFontSize} onChange={setBlockFontSize} />

      <CardIconButton onPress={clearBlock}>
        <Ionicons name="trash-outline" size={18} color="white" />
      </CardIconButton>
    </CardButtonGroup>
  );
}
