import { Theme } from '@material-ui/core/styles';

import { UiThemeVariables, variables } from '../config/variables';
import createMaterialThemeFor from '../config/themeConfig';

export interface IStyleConfig {
  PRIMARY_COLOR: string;
  PRIMARY_COLOR_DARK: string;
  PRIMARY_COLOR_DIM: string;
  TEXT_COLOR_DEFAULT: string;
  SIMPLE_TEXT_COLOR: string;
  SECONDARY_COLOR: string;
  MAIN_BACKGROUND_COLOR: string;
  FIELD_ICON_COLOR: string;
  WHITE: string;
  FONT_FAMILY_PRIMARY: string;
  FONT_FAMILY_SECONDARY: string;
  FONT_SIZE: number;
}

const DEFAULT_COLOR = variables.primaryColor;

export interface IThemeConfiguration {
  styleConfig: IStyleConfig;
  materialTheme: Theme;
}

export function createStyleConfig(
  themeVariables: UiThemeVariables
): IStyleConfig {
  return {
    PRIMARY_COLOR: themeVariables.primaryColor ?? DEFAULT_COLOR,
    PRIMARY_COLOR_DARK: themeVariables.primaryColorDark ?? DEFAULT_COLOR,
    PRIMARY_COLOR_DIM: themeVariables.primaryColorDim ?? DEFAULT_COLOR,
    SECONDARY_COLOR: themeVariables.secondaryColor ?? DEFAULT_COLOR,
    TEXT_COLOR_DEFAULT: themeVariables.textColorDefault ?? DEFAULT_COLOR,
    SIMPLE_TEXT_COLOR: themeVariables.simpleTextColor ?? DEFAULT_COLOR,
    MAIN_BACKGROUND_COLOR: themeVariables.mainBackgroundColor ?? DEFAULT_COLOR,
    FIELD_ICON_COLOR: themeVariables.fieldIconColor ?? DEFAULT_COLOR,
    WHITE: 'rgb(255,255,255)',
    FONT_FAMILY_PRIMARY: themeVariables.fontFamilyPrimary,
    FONT_FAMILY_SECONDARY: themeVariables.fontFamilySecondary,
    FONT_SIZE: themeVariables.fontSize,
  };
}

const makeThemeConfig = (configuration: Partial<IThemeConfiguration> = {}) => {
  const DEFAULT_STYLE_CONFIG = createStyleConfig(variables);

  const DEFAULT__CONFIGURATION: IThemeConfiguration = {
    styleConfig: DEFAULT_STYLE_CONFIG,
    materialTheme: createMaterialThemeFor(DEFAULT_STYLE_CONFIG, 'en'),
  };

  const newConfiguration: IThemeConfiguration = {
    ...DEFAULT__CONFIGURATION,
    ...configuration,
  };

  if (configuration.styleConfig) {
    if (!configuration.materialTheme) {
      newConfiguration.materialTheme = createMaterialThemeFor(
        configuration.styleConfig,
        'en'
      );
    }
  }

  return newConfiguration;
};

export default makeThemeConfig;
