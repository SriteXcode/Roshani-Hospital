import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en';
import { hi } from '../locales/hi';

const dictionaries = { en, hi };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('roshni_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('roshni_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const changeLanguage = (lang) => {
    if (dictionaries[lang]) {
      setLanguage(lang);
    }
  };

  // Nested key path lookup helper: t('nav.home') or t('hero.title', { name: 'Val' })
  const t = (keyPath, params = {}) => {
    const keys = keyPath.split('.');
    let current = dictionaries[language] || dictionaries.en;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if key missing in current language
        let fallback = dictionaries.en;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current === 'string') {
      let result = current;
      Object.keys(params).forEach((param) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
      return result;
    }

    return current || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
