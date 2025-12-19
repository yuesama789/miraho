import en from './en.json';
import de from './de.json';

export type Locale = 'en' | 'de';

export const translations = {
  en,
  de,
};

export const getTranslation = (locale: Locale) => translations[locale];

export default translations;
