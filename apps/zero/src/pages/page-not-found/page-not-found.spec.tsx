import { render } from '@testing-library/react';

import PageNotFoundPage from './page-not-found-page';
import { MemoryRouter } from 'react-router-dom';

describe('PageNotFound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PageNotFoundPage />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snap', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PageNotFoundPage />
      </MemoryRouter>
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            class="css-1hgqqqi-StyledPageNotFoundPage ecsgtma0"
          >
            <h1>
              Welcome to PageNotFoundPage!
            </h1>
            <a
              href="/"
            >
              Take me home!
            </a>
          </div>
        </div>
      </body>
    `);
  });
});
