import {
  CormorantGaramond_300Light,
  CormorantGaramond_600SemiBold,
  useFonts as useCormorantGaramondFonts,
} from "@expo-google-fonts/cormorant-garamond";
import {
  DancingScript_400Regular,
  DancingScript_700Bold,
  useFonts as useDancingScriptFonts,
} from "@expo-google-fonts/dancing-script";
import {
  GreatVibes_400Regular,
  useFonts as useGreatVibesFonts,
} from "@expo-google-fonts/great-vibes";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import {
  Lora_400Regular,
  Lora_700Bold,
  useFonts as useLoraFonts,
} from "@expo-google-fonts/lora";
import {
  Pacifico_400Regular,
  useFonts as usePacificoFonts,
} from "@expo-google-fonts/pacifico";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold,
  useFonts as usePlayfairDisplayFonts,
} from "@expo-google-fonts/playfair-display";

export function useAppFonts(): boolean {
  return [
    useGreatVibesFonts({ GreatVibes_400Regular }),
    useInterFonts({ Inter_400Regular, Inter_600SemiBold }),
    useDancingScriptFonts({ DancingScript_400Regular, DancingScript_700Bold }),
    usePlayfairDisplayFonts({
      PlayfairDisplay_400Regular,
      PlayfairDisplay_400Regular_Italic,
      PlayfairDisplay_700Bold,
    }),
    usePacificoFonts({ Pacifico_400Regular }),
    useLoraFonts({ Lora_400Regular, Lora_700Bold }),
    useCormorantGaramondFonts({
      CormorantGaramond_300Light,
      CormorantGaramond_600SemiBold,
    }),
  ].every(([loaded]) => loaded);
}
