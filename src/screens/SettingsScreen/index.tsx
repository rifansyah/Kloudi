import Text from "@components/uikits/Text";
import { useAuth } from "@contexts/AuthContext";
import { useI18n } from "@i18n";
import t from "@screens/SettingsScreen/strings";
import type { ThemeMode } from "@theme";
import { useTheme } from "@theme";
import { Alert, View } from "react-native";
import styles from "./styles";
import OptionButton from "./components/OptionButton";
import AccountSection from "./components/AccountSection";
import { useCallback } from "react";

type SettingsKey = Parameters<typeof t>[0];

const THEME_OPTIONS: { mode: ThemeMode; labelKey: SettingsKey }[] = [
  { mode: "light", labelKey: "themeLight" },
  { mode: "dark", labelKey: "themeDark" },
  { mode: "system", labelKey: "themeSystem" },
];

const LANGUAGE_OPTIONS: { code: string; labelKey: SettingsKey }[] = [
  { code: "en", labelKey: "langEn" },
  { code: "id", labelKey: "langId" },
  { code: "my", labelKey: "langMy" },
];

export default function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const { language, setLanguage } = useI18n();
  const { user, logout } = useAuth();

  const handleLogout = useCallback(() => {
    Alert.alert(t("logoutConfirm"), t("logoutMessage"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("logout"),
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  }, [logout, language]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text size="lg" weight="semibold">
          {t("themeSection")}
        </Text>
        <View style={styles.optionRow}>
          {THEME_OPTIONS.map((option) => (
            <OptionButton
              key={option.mode}
              value={option.mode}
              label={t(option.labelKey)}
              selected={mode === option.mode}
              onPress={setMode}
            />
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text size="lg" weight="semibold">
          {t("languageSection")}
        </Text>
        <View style={styles.optionRow}>
          {LANGUAGE_OPTIONS.map((option) => (
            <OptionButton
              key={option.code}
              value={option.code}
              label={t(option.labelKey)}
              selected={language === option.code}
              onPress={setLanguage}
            />
          ))}
        </View>
      </View>

      {user ? (
        <AccountSection email={user.email} onLogout={handleLogout} />
      ) : null}
    </View>
  );
}
