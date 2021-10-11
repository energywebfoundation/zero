import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useCallToActionButtonStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: '10px 40px',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      '& > span > svg': {
        fill: theme.palette.secondary.main
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.paper,
        '& > span > svg': {
          fill: theme.palette.primary.main
        },
      },
    },
  };
});
