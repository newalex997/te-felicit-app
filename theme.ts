export const theme = {
  colors: {
    background: "#1a1a2e",
    surface: "#fff",
    surfaceMuted: "rgba(255, 255, 255, 0.15)",
    text: "#fff",
    textInverse: "#1a1a2e",
    gradient: ["#667eea", "#764ba2", "#f093fb"] as const,
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    md: 16,
    lg: 24,
  },
  fontSizes: {
    md: 16,
    lg: 24,
  },
} as const;

export type AppTheme = typeof theme;
