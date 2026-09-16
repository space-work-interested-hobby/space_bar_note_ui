import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import vi from './vi.js';
import en from './en.js';

// Supported languages
export const LANGUAGES = {
  vi: { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
};

// Translations
const translations = { vi, en };

// Create context
const I18nContext = createContext();

// Get nested value from object using dot notation
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export function I18nProvider({ children, initialLanguage = 'vi' }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [isLoaded, setIsLoaded] = useState(true);

  // Get translation
  const t = useCallback((key, fallback = '') => {
    const value = getNestedValue(translations[language], key);
    return value || fallback || key;
  }, [language]);

  // Change language
  const changeLanguage = useCallback((lang) => {
    if (LANGUAGES[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, []);

  // Get current language info
  const currentLang = LANGUAGES[language] || LANGUAGES.vi;

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && LANGUAGES[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    currentLang,
    languages: LANGUAGES,
    isLoaded,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use i18n
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// Export translations for direct access if needed
export { translations };
