import { render } from '@testing-library/react';

import AppIndexPage from './app-index-page';

describe('AppIndexPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppIndexPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(<AppIndexPage />);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="css-x5mwes-StyledAppIndexPage e84r3mc0"
          >
            <h1>
              Welcome to AppIndexPage!
            </h1>
          </div>
        </div>
      </body>
    `);
  });
});
