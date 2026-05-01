import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "../context/I18nContext";
import { SUPPORTED_LOCALES, SupportedLocale } from "../i18n";

const LANGUAGE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ro: "Română",
  ru: "Русский",
  it: "Italiano",
};

const LANGUAGE_FLAGS: Record<SupportedLocale, string> = {
  en: "🇬🇧",
  ro: "🇷🇴",
  ru: "🇷🇺",
  it: "🇮🇹",
};

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { locale, setLocale, t } = useI18n();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </Pressable>
        <Text style={styles.title}>{t("settings")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>{t("language").toUpperCase()}</Text>
        <View style={styles.card}>
          {SUPPORTED_LOCALES.map((lang, index) => {
            const selected = locale === lang;
            const isLast = index === SUPPORTED_LOCALES.length - 1;
            return (
              <View key={lang}>
                <Pressable
                  onPress={() => setLocale(lang)}
                  style={styles.row}
                >
                  <View style={styles.rowLeft}>
                    <Text style={styles.flag}>{LANGUAGE_FLAGS[lang]}</Text>
                    <Text style={styles.rowLabel}>{LANGUAGE_LABELS[lang]}</Text>
                  </View>
                  {selected && (
                    <Feather name="check" size={18} color="#fff" />
                  )}
                </Pressable>
                {!isLast && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 28 }]}>{t("appInfo").toUpperCase()}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("version")}</Text>
            <Text style={styles.rowValue}>1.0.4</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    fontSize: 20,
  },
  rowLabel: {
    color: "#fff",
    fontSize: 16,
  },
  rowValue: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginLeft: 16,
  },
});
