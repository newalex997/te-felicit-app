import { GreatVibes_400Regular, useFonts as useGreatVibesFonts } from "@expo-google-fonts/great-vibes";
import { Inter_400Regular, Inter_600SemiBold, useFonts as useInterFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";

export default function RootLayout() {
  const [greatVibesLoaded] = useGreatVibesFonts({ GreatVibes_400Regular });
  const [interLoaded] = useInterFonts({ Inter_400Regular, Inter_600SemiBold });

  if (!greatVibesLoaded || !interLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
