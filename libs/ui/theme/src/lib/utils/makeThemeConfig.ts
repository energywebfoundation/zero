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
  SECONDARY_COLOR_LIGHT: string;

  MAIN_BACKGROUND_COLOR: string;
  FIELD_ICON_COLOR: string;
  WHITE: string;
  FONT_FAMILY_PRIMARY: string;
  FONT_SIZE: number;
  INPUT_BACKGROUND_COLOR: string;
  INPUT_TEXT_COLOR: string;
}

export interface IThemeConfiguration {
  styleConfig: IStyleConfig;
  materialTheme: Theme;
}

export function createStyleConfig(
  themeVariables: UiThemeVariables
): IStyleConfig {
  return {
    PRIMARY_COLOR: themeVariables.primaryColor,
    PRIMARY_COLOR_DARK: themeVariables.primaryColorDark,
    PRIMARY_COLOR_DIM: themeVariables.primaryColorDim,
    SECONDARY_COLOR: themeVariables.secondaryColor,
    SECONDARY_COLOR_LIGHT: themeVariables.secondaryColorLight,
    TEXT_COLOR_DEFAULT: themeVariables.textColorDefault,
    SIMPLE_TEXT_COLOR: themeVariables.simpleTextColor,
    MAIN_BACKGROUND_COLOR: themeVariables.mainBackgroundColor,
    FIELD_ICON_COLOR: themeVariables.fieldIconColor,
    WHITE: 'rgb(255,255,255)',
    FONT_FAMILY_PRIMARY: themeVariables.fontFamilyPrimary,
    FONT_SIZE: themeVariables.fontSize,
    INPUT_BACKGROUND_COLOR: themeVariables.inputBackgroundColor,
    INPUT_TEXT_COLOR: themeVariables.inputTextColor,
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