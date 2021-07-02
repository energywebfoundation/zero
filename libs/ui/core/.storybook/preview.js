import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { UiTheme } from '@energyweb/zero-theme';

addDecorator(withKnobs);

addDecorator((story) => <UiTheme>{story()}</UiTheme>);
