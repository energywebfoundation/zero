import { render } from '@testing-library/react';

import LanguageSelect from './language-select';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

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

  it('should render successfully', () => {
    const languageChangeHandlerMockFn = jest.fn();
    const { baseElement } = render(
      <LanguageSelect
        handleLanguageChange={(language) =>
          languageChangeHandlerMockFn(language)
        }
      />
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root"
          >
            <div
              class="MuiInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiSelect-root makeStyles-root-2 css-1aa5qj0-MuiInputBase-root-MuiInput-root"
            >
              <div
                aria-expanded="false"
                aria-haspopup="listbox"
                class="MuiSelect-select MuiSelect-standard MuiInput-input MuiInputBase-input css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input"
                role="button"
                tabindex="0"
              >
                components.LanguageSelect.en
              </div>
              <input
                aria-hidden="true"
                class="MuiSelect-nativeInput css-yf8vq0-MuiSelect-nativeInput"
                tabindex="-1"
                value="en"
              />
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconStandard css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon"
                data-testid="ArrowDropDownIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 10l5 5 5-5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
