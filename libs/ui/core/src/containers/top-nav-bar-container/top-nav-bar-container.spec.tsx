import { render } from '@testing-library/react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@energyweb/zero-ui-localization';

import TopNavBarContainer from './top-nav-bar-container';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StoreProvider } from '@energyweb/zero-ui-store';
import { MemoryRouter } from 'react-router-dom';

describe('TopNavBarContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <StoreProvider>
          <TopNavBarContainer />
        </StoreProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <StoreProvider>
          <TopNavBarContainer />
        </StoreProvider>
      </MemoryRouter>
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <header
            class="MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionStatic makeStyles-root-4 css-hip9hq-MuiPaper-root-MuiAppBar-root"
          >
            <div
              class="MuiToolbar-root MuiToolbar-regular css-1cndkqf-MuiToolbar-root"
            >
              <div
                class="MuiBox-root css-0"
              >
                <svg>
                  logo.svg
                </svg>
              </div>
              <div
                class="MuiBox-root css-1rn9ov5"
              >
                <div
                  class="MuiBox-root css-1l0r181"
                />
                <div
                  class="MuiBox-root css-1958zak"
                />
              </div>
              <div
                class="MuiBox-root css-27zll2"
              >
                <div
                  class="MuiBox-root css-mr3xd8"
                >
                  <hr
                    class="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical MuiDivider-flexItem css-sga10w-MuiDivider-root"
                    color="#9B95BD"
                  />
                </div>
                <div
                  class="css-gtvwfc"
                >
                  <button
                    class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                    style="color: white;"
                    tabindex="0"
                    type="button"
                  >
                    Sign in
                    <span
                      class="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon"
                    >
                      <svg
                        aria-hidden="true"
                        class="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeMedium css-dqoixo-MuiSvgIcon-root"
                        data-testid="PersonAddAlt1OutlinedIcon"
                        focusable="false"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13 8c0-2.21-1.79-4-4-4S5 5.79 5 8s1.79 4 4 4 4-1.79 4-4zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM1 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4zm2 0c.2-.71 3.3-2 6-2 2.69 0 5.78 1.28 6 2H3zm17-3v-3h3v-2h-3V7h-2v3h-3v2h3v3h2z"
                        />
                      </svg>
                    </span>
                    <span
                      class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                    />
                  </button>
                </div>
                <div
                  class="MuiBox-root css-s7c9fl"
                >
                  <div
                    class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root"
                  >
                    <div
                      class="MuiInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiSelect-root makeStyles-root-6 css-1aa5qj0-MuiInputBase-root-MuiInput-root"
                    >
                      <div
                        aria-expanded="false"
                        aria-haspopup="listbox"
                        class="MuiSelect-select MuiSelect-standard MuiInput-input MuiInputBase-input css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input"
                        role="button"
                        tabindex="0"
                      >
                        Eng
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
              </div>
            </div>
          </header>
        </div>
      </body>
    `);
  });
});
