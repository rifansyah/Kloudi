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
├── hooks/           # useForm
├── screens/
│   ├── LoginScreen/
│   ├── SignupScreen/
│   ├── HomeScreen/
│   └── SettingsScreen/
├── components/
│   └── uikits/      # FormInput, PrimaryButton, ErrorText, PasswordStrengthBar, Text
├── services/
│   ├── auth/        # MockAuthService (in-memory user store)
│   ├── storage/     # MMKVStorage (encrypted key-value)
│   └── users/       # UsersRepository (db)
├── i18n/            # i18next setup, EN / ID / MY locales
├── utils/           # validator, async
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
| Framework | React Native 0.85.2 |
| Language | TypeScript 5.8 (strict) |
| Navigation | React Navigation 7 |
| Storage | react-native-mmkv (encrypted) |
| i18n | i18next + react-i18next |
| Linting | Biome |
| Testing | Jest + react-test-renderer |

---

## Architecture: Auth Service & User Repository

```
AuthContext
    └── MockAuthService          ← "API" layer
            └── UsersRepository  ← "Database" layer
                    └── MMKVStorage  ← encrypted disk storage
```

### `UsersRepository` — in-app database

Simulates a database table. Stores users keyed by email in a `Map<string, StoredUser>`, serialized to MMKV under the key `"users_db"`. Users registered in a previous session survive app restarts.

| Method | Equivalent |
|---|---|
| `createUser(user)` | `INSERT INTO users` |
| `findByEmail(email)` | `SELECT * WHERE email = ?` |
| `deleteByEmail(email)` | `DELETE WHERE email = ?` |
| `clearAll()` | `TRUNCATE users` |

Two types keep passwords out of the rest of the app:
- `StoredUser = { id, name, email, password }` — stored internally
- `User = { id, name, email }` — exposed to `AuthContext` and screens

### `MockAuthService` — mock API

Implements `IAuthService` — the same interface a real REST/GraphQL auth service would implement. To connect a real backend, write `RealAuthService implements IAuthService` and pass it to `AuthProvider`. No other code changes needed.

Simulates:
- **Network latency** — `await delay(500)` on every call
- **Business rules** — duplicate email on signup, password match on login
- **Error contracts** — throws `"Email already registered"` / `"Invalid email or password"`, caught by `AuthContext` and surfaced as form errors

---

## Screenshot / Screen record

| Case   | Image                                      |
| ------ | ------------------------------------------ |
| Login + Home + Dark/Light Mode + Language + Logout | <video src="https://github.com/user-attachments/assets/9e8ea433-b16c-4ce7-88fa-3cd5247845e4" width="320px" /> |
| Signup | <video src="https://github.com/user-attachments/assets/c9f3a26f-cd8e-4e0f-862f-3192a084d356" width="320px" /> |
| State Persist | <video src="https://github.com/user-attachments/assets/eef39d3a-160c-4aba-bb99-cbd56ae75b00" width="320px" /> |
| Error Message | <img src="https://github.com/user-attachments/assets/88144748-91da-449e-9bdf-8c2c8bbea968" width="320px" /> |


