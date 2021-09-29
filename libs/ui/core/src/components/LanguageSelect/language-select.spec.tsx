import { render } from '@testing-library/react';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import LanguageSelect from './LanguageSelect';

const resources = {
  en: {},
  es: {},
};

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

describe('LanguageSelect', () => {
  const languageChangeHandlerMockFn = jest.fn();

  beforeEach((cb) => {
    jest.resetAllMocks();
    cb();
  });
  
  it('should render successfully', () => {
    const { baseElement } = render(
      <LanguageSelect
        handleLanguageChange={(language) =>
          languageChangeHandlerMockFn(language)
        }
      />
    );
    expect(baseElement).toBeTruthy();
  });

});
