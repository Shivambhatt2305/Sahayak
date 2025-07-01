
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Language = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadTranslations() {
      try {
        const mod = await import(`@/locales/${language}.json`);
        setTranslations(mod.default);
      } catch (error) {
        console.error(`Could not load translations for language: ${language}`, error);
        // Fallback to English
        const mod = await import(`@/locales/en.json`);
        setTranslations(mod.default);
      }
    }
    loadTranslations();
  }, [language]);

  const t = useCallback((key: string): string => {
    return translations[key] || key;
  }, [translations]);

  const value = {
    language,
    setLanguage,
    translations,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
