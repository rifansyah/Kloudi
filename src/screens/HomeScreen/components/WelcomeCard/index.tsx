import { memo } from "react";
import { View } from "react-native";
import Text from "@components/uikits/Text";
import { useI18n } from "@i18n";
import t from "@screens/HomeScreen/strings";
import { useTheme } from "@theme";
import styles from "./styles";

function WelcomeCard() {
  const { colors } = useTheme();
  useI18n(); // for listening to language changes

  return (
    <View
      style={[
        styles.welcomeCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={styles.welcomeEmoji}>🎉</Text>
      <View style={styles.welcomeCardContent}>
        <Text style={[styles.welcomeTitle, { color: colors.text }]}>
          {t("welcome")}
        </Text>
        <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
          {t("successfullyLoggedIn")}
        </Text>
      </View>
    </View>
  );
}

export default memo(WelcomeCard);
