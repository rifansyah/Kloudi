import { isValidEmail } from "@utils/validators";
import t from "../strings";
import type { LoginFormValues } from "../types";

export function validate(values: LoginFormValues) {
  const errors: any = {};

  if (!values.email.trim()) {
    errors.email = t("emailRequired");
  } else if (!isValidEmail(values.email)) {
    errors.email = t("invalidEmail");
  }

  if (!values.password) {
    errors.password = t("passwordRequired");
  }

  return errors;
}
