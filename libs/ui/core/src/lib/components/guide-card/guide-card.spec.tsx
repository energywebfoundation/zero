import { render } from '@testing-library/react';

import GuideCard from './guide-card';
import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { UiTheme } from '@energyweb/zero-ui-theme';

describe('GuideCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiTheme>
        <GuideCard
          headText={'Example head text'}
          subHeadText={'Example sub head text'}
          btnText={'Example button text'}
          btnIcon={ChevronRightOutlined}
          topIcon={StarBorderOutlined}
        />
      </UiTheme>
    );
    expect(baseElement).toBeTruthy();
  });
});
