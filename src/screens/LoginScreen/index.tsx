import React, { useCallback } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorText from "@components/uikits/ErrorText";
import FormInput from "@components/uikits/FormInput";
import PrimaryButton from "@components/uikits/PrimaryButton";
import { StorageKeys } from "@constants/storageKeys";
import { useAuth } from "@contexts/AuthContext";
import { useForm } from "@hooks/useForm";
import { useNavigation } from "@react-navigation/native";
import t from "@screens/LoginScreen/strings";
import Storage from "@services/storage";
import { useTheme } from "@theme";
import AppLogo from "./components/AppLogo";
import styles from "./styles";
import { validate } from "./utils/validation";

import type { LoginFormValues } from "./types";
import Text from "@components/uikits/Text";

export default function LoginScreen() {
  const { colors } = useTheme();
  const { login, isSubmitting } = useAuth();
  const navigation = useNavigation();

  const { values, errors, handleChange, handleSubmit, setServerError } =
    useForm<LoginFormValues>({
      initialValues: {
        email: Storage.getString(StorageKeys.LAST_EMAIL_ADDRESS) ?? "",
        password: "",
      },
      validate,
      onSubmit: async (values) => {
        try {
          await login(values.email, values.password);
          Storage.setString(StorageKeys.LAST_EMAIL_ADDRESS, values.email);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";

          setServerError(message);
        }
      },
    });

  const handleEmailChange = useCallback(
    (value: string) => {
      handleChange("email", value);
    },
    [handleChange]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      handleChange("password", value);
    },
    [handleChange]
  );

  const goToSignup = useCallback(() => {
    navigation.navigate("Signup" as never);
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <AppLogo />
          <Text style={[styles.title, { color: colors.text }]}>
            {t("welcomeBack")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("signInToAccount")}
          </Text>
        </View>

        <View
          style={[
            styles.formCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
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
            textContentType="password"
            autoComplete="current-password"
            secureTextEntry
            showToggle
          />
          <ErrorText message={errors.server ?? ""} />
          <View style={styles.buttonSpacing}>
            <PrimaryButton
              title={t("signIn")}
              onPress={handleSubmit}
              loading={isSubmitting}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {t("dontHaveAccount")}{" "}
          </Text>
          <Pressable onPress={goToSignup}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              {t("signUp")}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
