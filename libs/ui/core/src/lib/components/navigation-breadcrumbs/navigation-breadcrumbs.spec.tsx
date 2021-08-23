import { render } from '@testing-library/react';

import NavigationBreadcrumbs from './navigation-breadcrumbs';

describe('NavigationBreadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavigationBreadcrumbs />);
    expect(baseElement).toBeTruthy();
  });
});
