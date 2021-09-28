import { render } from '@testing-library/react';

import GenericFormMultiStep from './generic-form-multi-step';
import { SellerAddFacilitiesBasicInformationForm } from '@energyweb/zero-ui-seller';

describe('GenericFormStep', () => {
  it('should render successfully', () => {
    const activeIndexChangeHandlerMockFn = jest.fn();
    const submitHandlerMockfn = jest.fn();

    const { baseElement } = render(
      <GenericFormMultiStep
        formTitle={'Example form'}
        stepList={{
          step1: {
            stepNumericLabel: 'Step 1 label',
            stepItemNode: (
              <SellerAddFacilitiesBasicInformationForm
                submitHandler={submitHandlerMockfn}
              />
            ),
          },
        }}
        handleActiveIndexChange={activeIndexChangeHandlerMockFn}
        activeStepIndex={0}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
