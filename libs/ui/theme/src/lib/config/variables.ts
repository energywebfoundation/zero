const $purpleExtraDark = '#2D1155';
const $purpleDark = '#421D77';
const $purple = '#362c45';
const $purpleLight = '#CDABFF';
const $purpleExtraLight = '#F6EFFF';

const $green = '#00D08A';
const $greenLight = '#b1ebcd';

const $textColorDefault = '#a8a8a8';
const $inputBackgroundColor = '#F6F3F9';
const $inputTextColor = '#2D1155';

const $bodyBackgroundColor = '#ffffff';
const $mainBackgroundColor = '#ffffff';
const $fieldIconColor = '#ffffff';
const $white = '#ffffff';

const $fontFamilyPrimary = 'Rajdhani';
const $fontFamilySecondary = 'Rajdhani';

const $fontSize = 14;

export type UiThemeVariables = {
  primaryColor: string;
  primaryColorDark: string;
  primaryColorDim: string;
  secondaryColor: string;
  secondaryColorLight: string;
  textColorDefault: string;
  simpleTextColor: string;
  bodyBackgroundColor: string;
  inputBackgroundColor: string;
  inputTextColor: string;
  mainBackgroundColor: string;
  fieldIconColor: string;
  fontFamilyPrimary: string;
  fontFamilySecondary: string;
  hoverTextColor: string;
  fontSize: number;
};

export const variables: UiThemeVariables = {
  primaryColor: $purpleExtraDark,
  primaryColorDark: $purpleDark,
  primaryColorDim: $purple,
  secondaryColor: $green,
  secondaryColorLight: $greenLight,
  textColorDefault: $textColorDefault,
  simpleTextColor: $textColorDefault,
  bodyBackgroundColor: $bodyBackgroundColor,
  mainBackgroundColor: $mainBackgroundColor,
  fieldIconColor: $fieldIconColor,
  fontFamilyPrimary: $fontFamilyPrimary,
  fontFamilySecondary: $fontFamilySecondary,
  fontSize: $fontSize,
  inputBackgroundColor: $inputBackgroundColor,
  inputTextColor: $inputTextColor,
  hoverTextColor: $white
};
