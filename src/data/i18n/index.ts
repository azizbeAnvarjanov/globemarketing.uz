import { ru, TranslationKeys } from './ru';
import { uz } from './uz';

// Типы для i18n системы
export type SupportedLanguage = 'ru' | 'uz';
export type TranslationKey = keyof TranslationKeys;

// Все переводы
export const translations = {
  ru,
  uz
} as const;

// Дефолтный язык
export const DEFAULT_LANGUAGE: SupportedLanguage = 'ru';

// Получение переводов для определенного языка
export function getTranslations(language: SupportedLanguage = DEFAULT_LANGUAGE): TranslationKeys {
  return translations[language] || translations[DEFAULT_LANGUAGE];
}

// Хелпер для получения вложенного значения по пути
export function getNestedTranslation(
  translations: TranslationKeys, 
  path: string
): string {
  const result = path.split('.').reduce((obj: Record<string, unknown>, key: string) => {
    return obj?.[key] as Record<string, unknown>;
  }, translations as Record<string, unknown>);
  return (result as unknown as string) || path;
}

// Экспорт русских переводов как дефолтных
export { ru as defaultTranslations };
export type { TranslationKeys };
