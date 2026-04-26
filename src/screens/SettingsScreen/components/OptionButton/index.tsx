import { memo } from "react";
import { Pressable } from "react-native";
import Text from "@components/uikits/Text";
import { useTheme } from "@theme";
import styles from "./styles";

interface Props<T> {
  label: string;
  value: T;
  selected: boolean;
  onPress: (value: T) => void;
}

function OptionButton<T>({ label, value, selected, onPress }: Props<T>) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.optionButton,
        {
          backgroundColor: selected
            ? colors.primaryLight
            : colors.surfaceVariant,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
      onPress={() => onPress(value)}
    >
      <Text
        variant={selected ? "primary" : "secondary"}
        weight={selected ? "semibold" : "regular"}
        size="sm"
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default memo(OptionButton) as typeof OptionButton;
