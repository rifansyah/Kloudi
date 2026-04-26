import { useTheme } from "@theme";
import { type StyleProp, type TextStyle } from "react-native";
import Text from "../Text";

interface Props {
  message: string;
  style?: StyleProp<TextStyle>;
}

export default function ErrorText({ message, style }: Props) {
  const { theme } = useTheme();

  if (!message) {
    return null;
  }

  return (
    <Text
      style={[
        {
          color: theme.colors.error,
          fontSize: theme.typography.sizes.sm,
          fontWeight: theme.typography.weights
            .medium as TextStyle["fontWeight"],
        },
        style,
      ]}
    >
      {message}
    </Text>
  );
}
