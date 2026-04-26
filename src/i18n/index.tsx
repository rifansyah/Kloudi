export { getTranslation, setTranslationBundle } from './registry';

import type { IStorageService } from '@services/storage';
import i18n from 'i18next';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { initReactI18next } from 'react-i18next';
import { ActivityIndicator, I18nManager, View } from 'react-native';
import { getLocales } from 'react-native-localize';
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, type SupportedLanguage } from './constants';
import en from './locales/en.json';
import id from './locales/id.json';
import my from './locales/my.json';
import styles from './styles';

const STORAGE_KEY = 'i18n_language';

function detectLanguage(storage: IStorageService): string {
  const saved = storage.getString(STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
    return saved;
  }
  const deviceLocales = getLocales();
  const deviceLang = deviceLocales[0]?.languageCode ?? 'en';
  return SUPPORTED_LANGUAGES.includes(deviceLang as SupportedLanguage) ? deviceLang : 'en';
}

function applyRTL(language: string): void {
  const isRTL = RTL_LANGUAGES.includes(language);
  I18nManager.forceRTL(isRTL);
}

interface I18nState {
  ready: boolean;
  language: string;
}

type I18nAction = { type: 'SET_READY' } | { type: 'SET_LANGUAGE'; payload: string };

interface I18nContextValue {
  ready: boolean;
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  t: typeof i18n.t;
}

function reducer(state: I18nState, action: I18nAction): I18nState {
  switch (action.type) {
    case 'SET_READY':
      return { ...state, ready: true };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  storage: IStorageService;
}

export function I18nProvider({ children, storage }: I18nProviderProps) {
  const [state, dispatch] = useReducer(reducer, null, (): I18nState => {
    const language = detectLanguage(storage);
    return { ready: false, language };
  });

  useEffect(() => {
    const language = state.language;
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          id: { translation: id },
          my: { translation: my },
        },
        lng: language,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        compatibilityJSON: 'v4',
      })
      .then(() => {
        applyRTL(language);
        dispatch({ type: 'SET_READY' });
      })
      .catch(() => {
        dispatch({ type: 'SET_READY' });
      });
  }, [state.language]);

  const setLanguage = useCallback(
    async (lang: string) => {
      await i18n.changeLanguage(lang);
      applyRTL(lang);
      storage.setString(STORAGE_KEY, lang);
      dispatch({ type: 'SET_LANGUAGE', payload: lang });
    },
    [storage],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      ready: state.ready,
      language: state.language,
      setLanguage,
      t: i18n.t,
    }),
    [state.ready, state.language, setLanguage],
  );

  if (!state.ready) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
