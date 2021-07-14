import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FirstStep } from './step-report.stories';
import { UiTheme } from '@energyweb/zero-theme';

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
