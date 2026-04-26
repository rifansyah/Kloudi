import { memo } from "react";
import { View } from "react-native";
import Text from "@components/uikits/Text";
import { useI18n } from "@i18n";
import t from "@screens/HomeScreen/strings";
import { useTheme } from "@theme";
import styles from "./styles";

interface Props {
  name: string;
  email: string;
}

function AccountDetailsCard({ name, email }: Props) {
  const { colors } = useTheme();
  useI18n(); // for listening to language changes

  return (
    <View
      style={[
        styles.detailsCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View
        style={[styles.detailsHeader, { borderBottomColor: colors.border }]}
      >
        <Text style={[styles.detailsTitle, { color: colors.text }]}>
          {t("accountDetails")}
        </Text>
      </View>
      <View
        style={[styles.detailRow, { borderBottomColor: colors.borderLight }]}
      >
        <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
          {t("name")}
        </Text>
        <Text style={[styles.detailValue, { color: colors.text }]}>{name}</Text>
      </View>
      <View style={[styles.detailRow, styles.lastDetailRow]}>
        <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
          {t("email")}
        </Text>
        <Text style={[styles.detailValue, { color: colors.text }]}>
          {email}
        </Text>
      </View>
    </View>
  );
}

export default memo(AccountDetailsCard);
