import { Stack } from "expo-router";
import { useAppFonts } from "../hooks/useAppFonts";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import { I18nProvider } from "../context/I18nContext";
import { GreetingProvider } from "../context/GreetingContext";
import { ShareProvider } from "../context/ShareContext";
import { SavedCardsProvider } from "../context/SavedCardsContext";
import { OfflineScreen } from "../components/OfflineScreen";

const rootStyle = { flex: 1 } as const;

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SavedCardsProvider>
      <GreetingProvider>
        <ShareProvider>{children}</ShareProvider>
      </GreetingProvider>
    </SavedCardsProvider>
  );
}

function AppContent() {
  const { isConnected } = useNetworkStatus();

  if (!isConnected) return <OfflineScreen />;

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={rootStyle}>
      <ThemeProvider theme={theme}>
        <I18nProvider>
          <AppProviders>
            <AppContent />
          </AppProviders>
        </I18nProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
