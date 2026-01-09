import { ko } from './translations/ko';
import { en } from './translations/en';
import { languages, defaultLanguage, type LanguageCode } from './languages';

// Translation map
const translations = { ko, en } as const;

/**
 * Detect language from URL pathname
 * Returns 'en' if path starts with /en/, otherwise 'ko'
 */
export function getLanguageFromURL(pathname: string): LanguageCode {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') {
    return 'en';
  }
  return defaultLanguage;
}

/**
 * Get locale string for Intl APIs based on language
 */
export function getLocale(lang: LanguageCode): string {
  return languages[lang].locale;
}

/**
 * Get all translations for a language
 */
export function getTranslations(lang: LanguageCode) {
  return translations[lang];
}

/**
 * Build localized path
 * Adds /en/ prefix for English, keeps as-is for Korean
 */
export function localizedPath(path: string, lang: LanguageCode): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (lang === 'en') {
    return `/en${normalizedPath}`;
  }
  return normalizedPath;
}

/**
 * Get the alternate language path for language switcher
 */
export function getAlternateLanguagePath(
  pathname: string,
  currentLang: LanguageCode
): { lang: LanguageCode; path: string } {
  const alternateLang: LanguageCode = currentLang === 'ko' ? 'en' : 'ko';

  // Remove current language prefix if present
  let basePath = pathname;
  if (currentLang === 'en' && pathname.startsWith('/en')) {
    basePath = pathname.slice(3) || '/';
  }

  // Add language prefix for non-default language
  const alternatePath = alternateLang === 'en' ? `/en${basePath}` : basePath;

  return {
    lang: alternateLang,
    path: alternatePath,
  };
}

/**
 * Get tag label for a specific language
 */
export function getTagLabel(tag: string, lang: LanguageCode): string {
  return translations[lang].tags[tag] || tag;
}

/**
 * Format tag description based on language
 */
export function formatTagDescription(tags: string[], lang: LanguageCode): string {
  const t = translations[lang];
  const labels = tags.map((tag) => t.tags[tag] || tag);
  const patterns = t.tagDescription;

  if (labels.length === 1) {
    return patterns.single.replace('{label}', labels[0]);
  } else if (labels.length === 2) {
    return patterns.double
      .replace('{first}', labels[0])
      .replace('{second}', labels[1]);
  } else {
    const lastLabel = labels.pop()!;
    return patterns.multiple
      .replace('{list}', labels.join(', '))
      .replace('{last}', lastLabel);
  }
}

// Re-exports
export { languages, defaultLanguage, supportedLanguages } from './languages';
export type { LanguageCode } from './languages';
