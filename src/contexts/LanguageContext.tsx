'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, getTranslations, TranslationKeys, DEFAULT_LANGUAGE } from '@/data/i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationKeys;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем язык из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
      if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'uz')) {
        setLanguageState(savedLanguage);
      }
      setIsLoading(false);
    }
  }, []);

  // Функция для смены языка
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Получаем переводы для текущего языка
  const translations = getTranslations(language);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Хук для использования контекста языка
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Хук для получения только переводов (удобнее в компонентах)
export function useTranslations(): TranslationKeys {
  const { t } = useLanguage();
  return t;
}
