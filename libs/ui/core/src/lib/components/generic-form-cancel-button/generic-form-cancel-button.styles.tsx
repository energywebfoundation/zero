import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      color: theme.palette.primary.main,
      backgroundColor: '#fff',
      '&:hover': { color: '#fff' },
    },
  };
});
