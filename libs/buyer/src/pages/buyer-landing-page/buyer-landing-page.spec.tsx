import { render } from '@testing-library/react';

import BuyerLandingPage from './buyer-landing-page';

describe('BuyerLandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BuyerLandingPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(<BuyerLandingPage />);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="css-0"
          >
            <h1>
              Welcome to BuyerLandingPage!
            </h1>
          </div>
        </div>
      </body>
    `);
  });
});
