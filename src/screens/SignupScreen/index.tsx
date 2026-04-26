import React, { useCallback } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import ErrorText from "@components/uikits/ErrorText";
import FormInput from "@components/uikits/FormInput";
import PasswordStrengthBar from "@components/uikits/PasswordStrengthBar";
import PrimaryButton from "@components/uikits/PrimaryButton";
import { useAuth } from "@contexts/AuthContext";
import { useForm } from "@hooks/useForm";
import { useNavigation } from "@react-navigation/native";
import t from "@screens/SignupScreen/strings";
import Storage from "@services/storage";
import { useTheme } from "@theme";
import { getPasswordStrength } from "@utils/validators";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageKeys } from "@constants/storageKeys";
import styles from "./styles";
import type { SignupFormValues } from "./types";
import { validate } from "./utils/validation";
import Text from "@components/uikits/Text";

export default function SignupScreen() {
  const { colors } = useTheme();
  const { signup, isSubmitting } = useAuth();
  const navigation = useNavigation();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldError,
    setServerError,
  } = useForm<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        Storage.setString(StorageKeys.LAST_EMAIL_ADDRESS, values.email);
        await signup(values.name, values.email, values.password);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";

        if (message.includes("already")) {
          setFieldError("email", t("emailExists"));
        } else {
          setServerError(message);
        }

        Storage.delete(StorageKeys.LAST_EMAIL_ADDRESS);
      }
    },
  });

  const handleNameChange = useCallback(
    (v: string) => handleChange("name", v),
    [handleChange]
  );

  const handleEmailChange = useCallback(
    (v: string) => handleChange("email", v),
    [handleChange]
  );

  const handlePasswordChange = useCallback(
    (v: string) => handleChange("password", v),
    [handleChange]
  );

  const passwordStrength = getPasswordStrength(values.password);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("createAccount")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("joinToday")}
          </Text>
        </View>

        {/* Form */}
        <View
          style={[
            styles.formCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <FormInput
            label={t("fullName")}
            placeholder={t("fullName")}
            value={values.name}
            onChangeText={handleNameChange}
            error={errors.name}
            autoCapitalize="words"
            textContentType="name"
          />

          <FormInput
            label={t("emailAddress")}
            placeholder={t("emailAddress")}
            value={values.email}
            onChangeText={handleEmailChange}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <FormInput
            label={t("password")}
            placeholder={t("password")}
            value={values.password}
            onChangeText={handlePasswordChange}
            error={errors.password}
            secureTextEntry
            showToggle
            textContentType="newPassword"
            autoComplete="new-password"
          />

          <PasswordStrengthBar strength={passwordStrength} />

          <ErrorText message={errors.server ?? ""} />

          <View style={styles.buttonSpacing}>
            <PrimaryButton
              title={t("signUp")}
              onPress={handleSubmit}
              loading={isSubmitting}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {t("alreadyHaveAccount")}{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("Login" as never)}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              {t("login")}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
