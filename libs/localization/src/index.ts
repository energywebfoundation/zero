import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';

const resources = {
  en,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })
  .then((r) => console.log('i18n => init'));

export default i18n;
