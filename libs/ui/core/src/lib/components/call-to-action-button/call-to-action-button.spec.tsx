import { render } from '@testing-library/react';

import CallToActionButton from './call-to-action-button';
import { UiTheme } from '@energyweb/zero-theme';

describe('CallToActionButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiTheme>
        <CallToActionButton />
      </UiTheme>
    );
    expect(baseElement).toBeTruthy();
  });
});
