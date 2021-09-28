import { render } from '@testing-library/react';

import BuyerLandingPage from './buyer-landing-page';
import { StoreProvider } from '@energyweb/zero-ui-store';
import { UiTheme } from '@energyweb/zero-ui-theme';

describe('BuyerLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <StoreProvider>
        <UiTheme>
          <BuyerLandingPage />
        </UiTheme>
      </StoreProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <StoreProvider>
        <UiTheme>
          <BuyerLandingPage />
        </UiTheme>
      </StoreProvider>
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="MuiBox-root css-fzwid6"
          >
            <div
              class="MuiBox-root css-rm9e7r"
            >
              <h3
                class="MuiTypography-root MuiTypography-h3 css-1p4f6cv-MuiTypography-root"
              >
                buyerLandingPage.welcomeToZero
              </h3>
              <h5
                class="MuiTypography-root MuiTypography-h5 css-1sle86t-MuiTypography-root"
              >
                buyerLandingPage.aGlobalSearchEngineForRenevableEnergy
              </h5>
            </div>
            <div
              class="MuiBox-root css-0"
            >
              <button
                class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root makeStyles-root-3 css-1d4ibc5-MuiButtonBase-root-MuiButton-root"
                tabindex="0"
                type="button"
              >
                buyerLandingPage.callToAction
                <span
                  class="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon"
                >
                  <svg
                    aria-hidden="true"
                    class="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeMedium makeStyles-icon-4 css-1frrczp-MuiSvgIcon-root"
                    data-testid="PersonAddAltOutlinedIcon"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 9V6h-2v3h-3v2h3v3h2v-3h3V9h-3zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6.39 8.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56C1.61 15.07 1 16.1 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15c2.37 0 4.29.73 5.48 1.34.32.16.52.5.52.88V18z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div
              class="MuiBox-root css-rm9e7r"
            >
              <div
                class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-1u7a39t-MuiPaper-root"
              >
                <div
                  class="css-0"
                >
                  Here goes forms
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});
