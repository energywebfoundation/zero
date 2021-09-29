import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FirstStep } from './StepReport.stories';
import { UiTheme } from '@energyweb/zero-ui-theme';

describe('StepReport', () => {
  it('should render StepReport with first step', () => {
    const { baseElement } = render(
      <UiTheme>
        <FirstStep {...FirstStep.args} />
      </UiTheme>
    );
    expect(baseElement).toBeInTheDocument();
  });
});
