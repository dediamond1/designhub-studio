
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
import enRegister from './locales/en/register.json';
import svRegister from './locales/sv/register.json';
import enAds from './locales/en/ads.json';
import svAds from './locales/sv/ads.json';
import enNotFound from './locales/en/notFound.json';
import svNotFound from './locales/sv/notFound.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    login: enLogin,
    register: enRegister,
    ads: enAds,
    notFound: enNotFound
  },
  sv: {
    common: svCommon,
    home: svHome,
    login: svLogin,
    register: svRegister,
    ads: svAds,
    notFound: svNotFound
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
    ns: ['common', 'home', 'login', 'register', 'ads', 'notFound'],
    defaultNS: 'common'
  });

export default i18n;
