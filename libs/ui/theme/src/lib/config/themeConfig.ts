import { createTheme, Theme, ThemeOptions } from '@material-ui/core/styles';
import { variables } from './variables';
import { enUS, plPL } from '@material-ui/core/locale';
import { IStyleConfig } from '../utils/makeThemeConfig';

const getThemeConfig = (styleConfig: IStyleConfig): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1340,
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
    },
    background: {
      paper: styleConfig.MAIN_BACKGROUND_COLOR,
    },
    text: {
      primary: styleConfig.SIMPLE_TEXT_COLOR,
      secondary: styleConfig.TEXT_COLOR_DEFAULT,
      disabled: styleConfig.TEXT_COLOR_DEFAULT,
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
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: styleConfig.PRIMARY_COLOR,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { height: '50px' },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: styleConfig.INPUT_TEXT_COLOR,
          backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          borderRadius: '5px 5px',
          '&.Mui-disabled': {
            backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          },
          '&.Mui-error': {
            border: '1px solid',
            borderColor: '#DA2042',
          },
          '&.Mui-focused': {
            backgroundColor: styleConfig.INPUT_BACKGROUND_COLOR,
          },
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
        root: {},
        contained: {
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
          color: styleConfig.SIMPLE_TEXT_COLOR,
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
  },
});

const createMaterialTheme = (
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

export default createMaterialTheme;
