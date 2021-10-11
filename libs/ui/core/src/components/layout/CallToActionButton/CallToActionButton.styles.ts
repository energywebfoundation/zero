import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { variables } from '@energyweb/zero-ui-theme';

export const useCallToActionButtonStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: '10px 40px',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
      '& > span > svg': {
        // should be a better way to consume from theme 
        fill: variables.secondaryColor
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
