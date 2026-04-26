import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styled } from "styled-components/native";
import { useGreetingContext } from "../../context/GreetingContext";
import { CardIconButton } from "../../styles/index.styles";
import { ColorCircleIcon } from "./ColorCircleIcon";
import { FontSizeSlider } from "./FontSizeSlider";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  gap: 8px;
`;

const ActiveIconButton = styled(CardIconButton)`
  background-color: rgba(255, 255, 255, 0.45);
`;

export function CardFontButtons() {
  const {
    focusedBlockId,
    textBlocks,
    cycleBlockFont,
    cycleBlockColor,
    cycleBlockTextEffect,
    cycleBlockTextAlign,
    setBlockFontSize,
  } = useGreetingContext();

  if (!focusedBlockId) return null;

  const focusedBlock = textBlocks.find((b) => b.id === focusedBlockId);
  const textEffectActive = focusedBlock?.textEffect !== "none";
  const currentFontSize = focusedBlock?.fontSize ?? 0;
  const baseFontSize = focusedBlock?.baseFontSize ?? 0;

  const EffectButton = textEffectActive ? ActiveIconButton : CardIconButton;

  const currentTextAlign = focusedBlock?.textAlign ?? "center";
  const alignIconName =
    currentTextAlign === "left"
      ? "format-align-left"
      : currentTextAlign === "right"
        ? "format-align-right"
        : "format-align-center";

  return (
    <Row>
      <CardIconButton onPress={cycleBlockFont}>
        <Ionicons name="text-outline" size={18} color="white" />
      </CardIconButton>

      <CardIconButton onPress={cycleBlockColor}>
        <ColorCircleIcon />
      </CardIconButton>

      <EffectButton onPress={cycleBlockTextEffect}>
        <Ionicons name="sparkles-outline" size={18} color="white" />
      </EffectButton>

      <CardIconButton onPress={cycleBlockTextAlign}>
        <MaterialCommunityIcons name={alignIconName} size={18} color="white" />
      </CardIconButton>

      <FontSizeSlider
        value={currentFontSize}
        baseFontSize={baseFontSize}
        onChange={setBlockFontSize}
      />
    </Row>
  );
}
