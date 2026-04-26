import React, { memo } from "react";
import { useTheme } from "@theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import Text from "@components/uikits/Text";

interface Props {
  size?: number;
}

function AppLogo({ size = 64 }: Props) {
  const { colors } = useTheme();
  const logoScale = useSharedValue(1);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  logoScale.value = withRepeat(
    withSequence(
      withTiming(1.05, { duration: 1000 }),
      withTiming(1, { duration: 1000 })
    ),
    -1
  );

  return (
    <Animated.View
      style={[
        styles.logo,
        { width: size, height: size, backgroundColor: colors.primary },
        logoAnimatedStyle,
      ]}
    >
      <Text style={[styles.logoIcon, { fontSize: size * 0.4375 }]}>🛡</Text>
    </Animated.View>
  );
}

export default memo(AppLogo);
