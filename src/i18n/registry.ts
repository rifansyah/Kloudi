import i18n from 'i18next';

export const setTranslationBundle = (
  namespace: string,
  ...resources: { lang: string; bundle: Record<string, unknown> }[]
) => {
  for (const res of resources) {
    i18n.addResourceBundle(res.lang, 'translation', { [namespace]: res.bundle }, true, true);
  }
};

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K;
    }[keyof T & string]
  : never;

export const getTranslation = <T extends Record<string, unknown> = Record<string, unknown>>(
  namespace: string,
) => {
  const fixedT = i18n.getFixedT(null, 'translation') as (
    key: string,
    options?: Record<string, unknown>,
  ) => string;
  return (key: NestedKeyOf<T>, options?: { common?: boolean } & Record<string, unknown>) => {
    if (options?.common) {
      return fixedT(key as string, options);
    }
    return fixedT(`${namespace}.${key as string}`, options);
  };
};
