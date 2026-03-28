import { DancingScript_400Regular, DancingScript_700Bold, useFonts as useDancingScriptFonts } from "@expo-google-fonts/dancing-script";
import { GreatVibes_400Regular, useFonts as useGreatVibesFonts } from "@expo-google-fonts/great-vibes";
import { Inter_400Regular, Inter_600SemiBold, useFonts as useInterFonts } from "@expo-google-fonts/inter";
import { Pacifico_400Regular, useFonts as usePacificoFonts } from "@expo-google-fonts/pacifico";
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts as usePlayfairDisplayFonts } from "@expo-google-fonts/playfair-display";
import { Sacramento_400Regular, useFonts as useSacramentoFonts } from "@expo-google-fonts/sacramento";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";

export default function RootLayout() {
  const [greatVibesLoaded] = useGreatVibesFonts({ GreatVibes_400Regular });
  const [interLoaded] = useInterFonts({ Inter_400Regular, Inter_600SemiBold });
  const [dancingScriptLoaded] = useDancingScriptFonts({ DancingScript_400Regular, DancingScript_700Bold });
  const [playfairLoaded] = usePlayfairDisplayFonts({ PlayfairDisplay_400Regular, PlayfairDisplay_700Bold });
  const [sacramentoLoaded] = useSacramentoFonts({ Sacramento_400Regular });
  const [pacificoLoaded] = usePacificoFonts({ Pacifico_400Regular });

  if (!greatVibesLoaded || !interLoaded || !dancingScriptLoaded || !playfairLoaded || !sacramentoLoaded || !pacificoLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
