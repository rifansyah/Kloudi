import { useTheme } from "@theme";
import { memo, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import Text from "../Text";

interface Props {
  strength: "" | "weak" | "fair" | "strong";
}

const strengthConfig = {
  "": { segments: 0, color: "border", label: "" },
  weak: { segments: 1, color: "error", label: "Weak" },
  fair: { segments: 2, color: "warning", label: "Fair" },
  strong: { segments: 3, color: "success", label: "Strong" },
} as const;

function PasswordStrengthBar({ strength }: Props) {
  const { theme } = useTheme();
  const config = strengthConfig[strength];
  const activeColor = theme.colors[config.color as keyof typeof theme.colors];
  const fillProgress = useSharedValue(0);

  useEffect(() => {
    fillProgress.value = withTiming(config.segments / 3, { duration: 300 });
  }, [config.segments, fillProgress]);

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${fillProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View
        style={[styles.barBackground, { backgroundColor: theme.colors.border }]}
      >
        <Animated.View
          style={[
            styles.barFill,
            { backgroundColor: activeColor },
            animatedFillStyle,
          ]}
        />
      </View>
      {config.label ? (
        <Text style={[styles.label, { color: activeColor }]}>
          {config.label}
        </Text>
      ) : null}
    </View>
  );
}

export default memo(PasswordStrengthBar);
