export const LANGUAGE = {
  EN: 'en',
  ID: 'id',
  MY: 'my',
} as const;

export type SupportedLanguage = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  LANGUAGE.EN,
  LANGUAGE.ID,
  LANGUAGE.MY,
];

export const RTL_LANGUAGES: readonly string[] = [];

export const ScreensNS = {
  HOME: 'home',
  SETTINGS: 'settings',
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const;

export const ComponentsNS = {} as const;

export const CommonNS = {
  COMMON: 'common',
  TABS: 'tabs',
} as const;
