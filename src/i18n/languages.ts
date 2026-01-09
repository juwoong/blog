export const languages = {
  ko: {
    code: 'ko',
    name: '한국어',
    shortName: 'KO',
    locale: 'ko-KR',
    isDefault: true,
  },
  en: {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    locale: 'en-US',
    isDefault: false,
  },
} as const;

export type LanguageCode = keyof typeof languages;
export const defaultLanguage: LanguageCode = 'ko';
export const supportedLanguages = Object.keys(languages) as LanguageCode[];
