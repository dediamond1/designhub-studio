
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Common translations
import enCommon from './locales/en/common.json';
import svCommon from './locales/sv/common.json';

// Page-specific translations
import enHome from './locales/en/home.json';
import svHome from './locales/sv/home.json';
import enLogin from './locales/en/login.json';
import svLogin from './locales/sv/login.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    login: enLogin
  },
  sv: {
    common: svCommon,
    home: svHome,
    login: svLogin
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    // Using namespaces for better organization
    ns: ['common', 'home', 'login'],
    defaultNS: 'common'
  });

export default i18n;
