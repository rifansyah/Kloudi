import { memo, useEffect } from "react";
import { View } from "react-native";
import Text from "@components/uikits/Text";
import t from "@screens/HomeScreen/strings";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styles from "./styles";
import { useI18n } from "@i18n/index";

interface Props {
  name: string;
  email: string;
  backgroundColor: string;
}

function ProfileCard({ name, email, backgroundColor }: Props) {
  const avatarScale = useSharedValue(0);
  useI18n(); // for listening to language changes

  useEffect(() => {
    avatarScale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, [avatarScale]);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.headerCard, { backgroundColor }]}>
      <View style={styles.headerPattern} />
      <View style={styles.headerContent}>
        <Animated.View style={[styles.avatar, avatarAnimatedStyle]}>
          <View style={styles.avatarInner}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </Animated.View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <View style={styles.activeBadge}>
          <View style={styles.activeDot} />
          <Text style={styles.activeText}>{t("activeSession")}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(ProfileCard);
