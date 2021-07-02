import { render } from '@testing-library/react';

import IconLink from './icon-link';
import PersonAddAltOutlinedIcon from '@material-ui/icons/PersonAddAltOutlined';

describe('IconLink', () => {
  const navigatehandlerMockFn = jest.fn((url) => url);
  const url = 'register';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <IconLink
        url={url}
        handleNavigate={navigatehandlerMockFn}
        text={'auth.regiser'}
        icon={PersonAddAltOutlinedIcon}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <IconLink
        url={url}
        handleNavigate={navigatehandlerMockFn}
        text={'auth.regiser'}
        icon={PersonAddAltOutlinedIcon}
      />
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="css-gtvwfc"
          >
            <button
              class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1e6y48t-MuiButtonBase-root-MuiButton-root"
              style="color: white;"
              tabindex="0"
              type="button"
            >
              auth.regiser
              <span
                class="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon"
              >
                <svg
                  aria-hidden="true"
                  class="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeMedium css-dqoixo-MuiSvgIcon-root"
                  data-testid="PersonAddAltOutlinedIcon"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 9V6h-2v3h-3v2h3v3h2v-3h3V9h-3zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6.39 8.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56C1.61 15.07 1 16.1 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15c2.37 0 4.29.73 5.48 1.34.32.16.52.5.52.88V18z"
                  />
                </svg>
              </span>
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
      </body>
    `);
  });
});
