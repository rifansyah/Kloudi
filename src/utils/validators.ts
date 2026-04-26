export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function isValidName(name: string): boolean {
  return name.trim().length > 0;
}

export function getPasswordStrength(
  password: string
): "" | "weak" | "fair" | "strong" {
  const len = password.length;
  if (len <= 2) return "";
  if (len <= 5) return "weak";
  if (len <= 8) return "fair";
  return "strong";
}
