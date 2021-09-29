import { render } from '@testing-library/react';
import { UiTheme } from '@energyweb/zero-ui-theme';
import CallToActionButton from './CallToActionButton';

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
