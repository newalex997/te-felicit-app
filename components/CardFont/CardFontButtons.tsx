import { Ionicons } from "@expo/vector-icons";
import { useGreetingContext } from "../../context/GreetingContext";
import { CardButtonGroup, CardIconButton } from "../../styles/index.styles";
import { ColorCircleIcon } from "./ColorCircleIcon";
import { FontSizeSlider } from "./FontSizeSlider";

const GRADIENT_COLORS = ["rgba(0,0,0,0.75)", "rgba(0,0,0,0.3)"] as const;
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 0, y: 1 };

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
      colors={GRADIENT_COLORS}
      start={GRADIENT_START}
      end={GRADIENT_END}
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
