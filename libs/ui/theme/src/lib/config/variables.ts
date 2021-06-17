const $purpleExtraDark = '#2D1155';
const $purpleDark = '#421D77';
const $purple = '#362c45';
const $purpleLight = '#CDABFF';
const $purpleExtraLight = '#F6EFFF';

const $green = '#00D08A';

const $textColorDefault = '#a8a8a8';
const $simpleTextColor = '#000';

const $bodyBackgroundColor = '#ffffff';
const $mainBackgroundColor = '#272727';
const $fieldIconColor = '#ffffff';

const $fontFamilyPrimary = 'Rajdhani';
const $fontFamilySecondary = 'Rajdhani';

const $fontSize = 12;

export type UiThemeVariables = {
  primaryColor: string;
  primaryColorDark: string;
  primaryColorDim: string;
  textColorDefault: string;
  simpleTextColor: string;
  bodyBackgroundColor: string;
  mainBackgroundColor: string;
  fieldIconColor: string;
  fontFamilyPrimary: string;
  fontFamilySecondary: string;
  fontSize: number;
};

export const variables: UiThemeVariables = {
  primaryColor: $purpleExtraDark,
  primaryColorDark: $purpleDark,
  primaryColorDim: $purple,
  textColorDefault: $textColorDefault,
  simpleTextColor: $simpleTextColor,
  bodyBackgroundColor: $bodyBackgroundColor,
  mainBackgroundColor: $mainBackgroundColor,
  fieldIconColor: $fieldIconColor,
  fontFamilyPrimary: $fontFamilyPrimary,
  fontFamilySecondary: $fontFamilySecondary,
  fontSize: $fontSize,
};
