import { memo } from "react";
import { Pressable, View } from "react-native";
import Text from "@components/uikits/Text";
import t from "@screens/SettingsScreen/strings";
import { useTheme } from "@theme";
import styles from "./styles";

interface Props {
  email: string;
  onLogout: () => void;
}

function AccountSection({ email, onLogout }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <Text size="lg" weight="semibold">
        {t("account")}
      </Text>
      <View style={[styles.accountRow, { borderBottomColor: colors.border }]}>
        <Text variant="secondary" size="sm">
          {t("signedInAs")}
        </Text>
        <Text size="md">{email}</Text>
      </View>
      <Pressable
        style={[
          styles.logoutButton,
          { borderColor: colors.error, backgroundColor: colors.surface },
        ]}
        onPress={onLogout}
        android_ripple={{ color: colors.errorLight }}
      >
        <Text variant="error" weight="semibold" size="lg">
          {t("logout")}
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(AccountSection);
