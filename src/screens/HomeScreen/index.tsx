import { useAuth } from "@contexts/AuthContext";
import { useTheme } from "@theme";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import ProfileCard from "./components/ProfileCard";
import WelcomeCard from "./components/WelcomeCard";
import AccountDetailsCard from "./components/AccountDetailsCard";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ProfileCard
        name={user.name}
        email={user.email}
        backgroundColor={colors.primary}
      />

      <View style={styles.cards}>
        <WelcomeCard />
        <AccountDetailsCard name={user.name} email={user.email} />
      </View>
    </ScrollView>
  );
}
