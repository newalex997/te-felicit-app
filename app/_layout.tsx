import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
