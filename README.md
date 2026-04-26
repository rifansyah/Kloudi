# Kloudi — React Native Auth App

A React Native authentication app built with TypeScript, featuring login, signup, and a home screen. Demonstrates Context API state management, encrypted persistence, navigation, and internationalization.

---

## Features

### Core
- **Login** — email/password validation, inline error messages, incorrect credentials feedback
- **Signup** — name/email/password with field-level validation (required fields, email format, password min 6 chars)
- **Home Screen** — displays authenticated user's name and email
- **Logout** — clears session and returns to login
- **Password visibility toggle** — 🙈/🙉 icon on password fields

### Auth
- `AuthContext` (React Context API + `useReducer`) manages `user`, `login`, `signup`, `logout`, `isLoading`, `isSubmitting`
- Encrypted persistence via **MMKV** — auth state survives app restarts

### Navigation
- **React Navigation** with conditional routing: unauthenticated → Auth stack (Login / Signup), authenticated → Tab navigator (Home / Settings)

### Settings
- **Theme** — Light / Dark / System
- **Language** — English / Indonesian / Malay

---

## Setup

### Prerequisites
- Node.js ≥ 22
- Ruby (for CocoaPods on iOS)
- Xcode (iOS) or Android Studio (Android)
- React Native CLI environment — see [official setup guide](https://reactnative.dev/docs/set-up-your-environment)

### Install

```bash
git clone <repo-url>
cd kloudi
yarn install
```

### iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

### Android

```bash
yarn android
```

---

## Project Structure

```
src/
├── contexts/        # AuthContext — global auth state
├── navigation/      # RootNavigator, AuthStack, TabNavigator
├── screens/
│   ├── LoginScreen/
│   ├── SignupScreen/
│   ├── HomeScreen/
│   └── SettingsScreen/
├── components/
│   └── uikits/      # FormInput, PrimaryButton, ErrorText, PasswordStrengthBar, Text
├── services/
│   ├── auth/        # MockAuthService (in-memory user store)
│   └── storage/     # MMKVStorage (encrypted key-value)
├── i18n/            # i18next setup, EN / ID / MY locales
└── theme/           # Light/dark theme tokens, ThemeContext
```

---

## Running Tests

```bash
yarn test
```

Type-check only:

```bash
npx tsc
```

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | React Native 0.79 |
| Language | TypeScript 5.8 (strict) |
| Navigation | React Navigation 7 |
| Storage | react-native-mmkv (encrypted) |
| i18n | i18next + react-i18next |
| Linting | Biome |
| Testing | Jest + react-test-renderer |

---

## Screenshot / Screen record

| Case   | Image                                      |
| ------ | ------------------------------------------ |
| Case 1 | <img src="paste_url_here" width="320px" /> |
| Case 2 | <img src="paste_url_here" width="320px" /> |
