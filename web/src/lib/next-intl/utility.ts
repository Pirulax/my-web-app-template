import type { Locale } from './routing';

export const getLocaleCodeOfLocale = (locale: Locale) => {
  switch (locale) {
    case 'rs':
      return 'sr';
    default:
      throw new Error(`Unsupported locale: ${locale as any}`);
  }
};

/** See https://www.localeplanet.com/icu/iso639.html */
export const getLanguageCodeOfLocale = (locale: Locale) => {
  switch (locale) {
    case 'rs':
      return 'sr-Latn-RS';
    default:
      throw new Error(`Unsupported locale: ${locale as any}`);
  }
};
