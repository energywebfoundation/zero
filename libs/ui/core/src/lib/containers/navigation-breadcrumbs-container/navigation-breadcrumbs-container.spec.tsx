import { render } from '@testing-library/react';

import NavigationBreadcrumbsContainer from './navigation-breadcrumbs-container';

describe('NavigationBreadcrumbsContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavigationBreadcrumbsContainer />);
    expect(baseElement).toBeTruthy();
  });
});
