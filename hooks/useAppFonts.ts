import {
  DancingScript_700Bold,
  useFonts as useDancingScriptFonts,
} from "@expo-google-fonts/dancing-script";
import {
  GreatVibes_400Regular,
  useFonts as useGreatVibesFonts,
} from "@expo-google-fonts/great-vibes";
import {
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import {
  Pacifico_400Regular,
  useFonts as usePacificoFonts,
} from "@expo-google-fonts/pacifico";
import {
  PlayfairDisplay_400Regular,
  useFonts as usePlayfairDisplayFonts,
} from "@expo-google-fonts/playfair-display";
import {
  Sacramento_400Regular,
  useFonts as useSacramentoFonts,
} from "@expo-google-fonts/sacramento";

export function useAppFonts(): boolean {
  return [
    useGreatVibesFonts({ GreatVibes_400Regular }),
    useInterFonts({ Inter_600SemiBold }),
    useDancingScriptFonts({ DancingScript_700Bold }),
    usePlayfairDisplayFonts({ PlayfairDisplay_400Regular }),
    useSacramentoFonts({ Sacramento_400Regular }),
    usePacificoFonts({ Pacifico_400Regular }),
  ].every(([loaded]) => loaded);
}
