import { isValidEmail, isValidName, isValidPassword } from "@utils/validators";
import t from "../strings";
import type { SignupFormValues } from "../types";

export function validate(values: SignupFormValues) {
  const errors: any = {};

  if (!isValidName(values.name)) {
    errors.name = t("nameRequired");
  }

  if (!values.email.trim()) {
    errors.email = t("emailRequired");
  } else if (!isValidEmail(values.email)) {
    errors.email = t("invalidEmail");
  }

  if (!values.password) {
    errors.password = t("passwordRequired");
  } else if (!isValidPassword(values.password)) {
    errors.password = t("passwordTooShort");
  }

  return errors;
}
