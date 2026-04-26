import { useTheme } from "@theme";
import { useMemo } from "react";
import { Text as RNText, type StyleProp, type TextStyle } from "react-native";

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  heading?: boolean;
}

function Text({
  children,
  style,
  variant = "primary",
  size = "md",
  weight = "regular",
  heading = false,
}: TextProps) {
  const { theme } = useTheme();
  const { colors, typography } = theme;

  const color =
    variant === "primary"
      ? colors.text
      : variant === "secondary"
      ? colors.textSecondary
      : colors.error;

  const textStyle = useMemo(
    () => ({
      color,
      fontSize: typography.sizes[size],
      fontWeight: typography.weights[weight] as TextStyle["fontWeight"],
      fontFamily: heading
        ? typography.families.heading
        : typography.families.regular,
    }),
    [color, size, weight, heading, typography]
  );

  return <RNText style={[textStyle, style]}>{children}</RNText>;
}

export default Text;
