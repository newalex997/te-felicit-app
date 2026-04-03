import { Stack } from "expo-router";
import { useAppFonts } from "../hooks/useAppFonts";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import { I18nProvider, useI18n } from "../context/I18nContext";
import { GreetingProvider } from "../context/GreetingContext";
import { ShareProvider } from "../context/ShareContext";

function AppProviders({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  return (
    <GreetingProvider locale={locale}>
      <ShareProvider>{children}</ShareProvider>
    </GreetingProvider>
  );
}

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <I18nProvider>
          <AppProviders>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }} />
          </AppProviders>
        </I18nProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
