import { render } from '@testing-library/react';

import ProcessingContainer from './processing-container';

describe('ProcessingContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ProcessingContainer
        isProcessing={true}
        children={<div>Example content</div>}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match inline snapshot', () => {
    const { baseElement } = render(
      <ProcessingContainer
        isProcessing={true}
        children={<div>Example content</div>}
      />
    );
    expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="css-cssveg"
    >
      <div
        class="MuiBox-root css-17syz4o"
      >
        <span
          class="MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary css-y4m1tr-MuiCircularProgress-root"
          role="progressbar"
          style="width: 40px; height: 40px;"
        >
          <svg
            class="MuiCircularProgress-svg css-1idz92c-MuiCircularProgress-svg"
            viewBox="22 22 44 44"
          >
            <circle
              class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate css-176wh8e-MuiCircularProgress-circle"
              cx="44"
              cy="44"
              fill="none"
              r="20.2"
              stroke-width="3.6"
            />
          </svg>
        </span>
      </div>
      <div>
        Example content
      </div>
    </div>
  </div>
</body>
`);
  });
});
