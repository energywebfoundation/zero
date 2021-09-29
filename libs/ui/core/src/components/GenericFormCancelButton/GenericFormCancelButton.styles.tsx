import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-ui-theme';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      color: theme.palette.primary.main,
      backgroundColor: '#fff',
      '&:hover': { color: '#fff' },
    },
    icon: {
      fill: variables.secondaryColor,
      '&:hover': {
        fill: variables.primaryColor,
      },
    },
  };
});
