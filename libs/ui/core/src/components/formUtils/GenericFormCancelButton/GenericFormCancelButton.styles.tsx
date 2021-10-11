import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      background: theme.palette.background.paper,
      color: theme.palette.primary.main,
      '& > span > svg': {
        fill: theme.palette.secondary.main,
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        '& > span > svg': {
          fill: theme.palette.primary.main,
        },
      },
    },
  };
});
