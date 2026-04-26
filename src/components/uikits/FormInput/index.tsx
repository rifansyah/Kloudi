import { useTheme } from "@theme";
import { memo, useCallback, useState } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  type TextInputProps,
  View,
} from "react-native";
import Text from "../Text";
import styles from "./styles";

interface Props extends TextInputProps {
  label: string;
  error?: string;
  showToggle?: boolean;
}

function FormInput({
  label,
  error,
  showToggle,
  secureTextEntry,
  value,
  onChangeText,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const togglePassword = useCallback(() => setShowPassword((v) => !v), []);

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  const bgColor = error
    ? theme.colors.errorLight
    : isFocused
    ? theme.colors.primarySurface
    : "transparent";

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          { borderColor, backgroundColor: bgColor },
        ]}
      >
        <View style={styles.inputArea}>
          <RNTextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder={label}
            placeholderTextColor={theme.colors.textSecondary}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={showToggle ? !showPassword : secureTextEntry}
            {...rest}
          />
        </View>
        {showToggle ? (
          <Pressable
            onPress={togglePassword}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.toggleButton}
          >
            <Text
              style={[styles.toggleIcon, { color: theme.colors.textSecondary }]}
            >
              {showPassword ? "🙉" : "🙈"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export default memo(FormInput);
