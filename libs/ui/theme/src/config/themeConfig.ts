import {
  createTheme,
  darken,
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles';
import { enUS, plPL } from '@material-ui/core/locale';
import { IStyleConfig } from '../utils/makeThemeConfig';
import { variables } from './variables';

const getThemeConfig = (styleConfig: IStyleConfig): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1392,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: styleConfig.PRIMARY_COLOR,
      contrastText: styleConfig.SIMPLE_TEXT_COLOR,
    },
    secondary: {
      main: styleConfig.SECONDARY_COLOR,
      light: styleConfig.SECONDARY_COLOR_LIGHT,
    },
    background: {
      paper: styleConfig.MAIN_BACKGROUND_COLOR,
    },
    text: {
      primary: styleConfig.SIMPLE_TEXT_COLOR,
      secondary: styleConfig.TEXT_COLOR_DEFAULT,
      disabled: styleConfig.TEXT_COLOR_DEFAULT,
    },
    success: {
      main: '#ABDE19',
    },
    warning: {
      main: '#FFB800',
    },
    error: {
      main: '#DA2042',
    },
  },
  typography: {
    fontFamily: styleConfig.FONT_FAMILY_PRIMARY,
    fontSize: styleConfig.FONT_SIZE,
    button: { textTransform: 'none' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: styleConfig.PRIMARY_COLOR,
          fontWeight: 600,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontWeight: 600, color: styleConfig.PRIMARY_COLOR },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: styleConfig.PRIMARY_COLOR,
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          lineHeight: '16px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          '&.MuiFilledInput-input': {
            padding: '14px 32px 14px 12px'
          }
        },

      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          padding: '16px 0 16px 12px',
        },
        root: {
          color: styleConfig.INPUT_TEXT_COLOR,
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          borderRadius: '5px',
          maxHeight: '48px',
          '&.Mui-disabled': {
            backgroundColor: darken(styleConfig.INPUT_BACKGROUND_COLOR, 0.2),
          },
          '&.Mui-error': {
            border: '1px solid',
            borderColor: '#DA2042',
          },
          '&.Mui-focused': {
            backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          },
          '&:before': {
            borderBottom: 'none'
          },
          '& fieldset': {
            borderRadius: 5
          }
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '6px 8px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { fontSize: variables.fontSize },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginRight: '10px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: styleConfig.MAIN_BACKGROUND_COLOR,
          color: styleConfig.TEXT_COLOR_DEFAULT,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: 16
        },
        contained: {
          color: styleConfig.MAIN_BACKGROUND_COLOR,
          '& > span > svg': {
            color: styleConfig.SECONDARY_COLOR,
          },
          '&:hover': {
            backgroundColor: styleConfig.SECONDARY_COLOR,
            '& > span > svg': {
              color: styleConfig.PRIMARY_COLOR,
            }
          },
          '&.Mui-disabled': {
            color: styleConfig.TEXT_COLOR_DEFAULT,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderBottom: `2px solid ${styleConfig.PRIMARY_COLOR}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: styleConfig.MAIN_BACKGROUND_COLOR,
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          'tr:nth-of-type(1n)': {
            backgroundColor: styleConfig.PRIMARY_COLOR,
            'tr:nth-of-type(2n)': {
              backgroundColor: styleConfig.PRIMARY_COLOR_DIM,
            },
          },
        },
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          background: styleConfig.MAIN_BACKGROUND_COLOR,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 16,
          borderBottom: 'none',
        },
        body: {
          color: styleConfig.TEXT_COLOR_DEFAULT,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: styleConfig.PRIMARY_COLOR,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: styleConfig.SIMPLE_TEXT_COLOR,
        },
        h5: {},
        body1: {},
        gutterBottom: {
          marginBottom: '1rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: styleConfig.PRIMARY_COLOR,
        },
      },
    },
    MuiCard: {
      styleOverrides: { root: { padding: '40px' } },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingBottom: '20px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
  },
});

export const createMaterialTheme = (
  styleConfig: IStyleConfig,
  language: 'en'
): Theme => {
  const materialLocale =
    {
      pl: plPL,
      en: enUS,
    }[language] ?? enUS;

  return createTheme(getThemeConfig(styleConfig), materialLocale);
};
