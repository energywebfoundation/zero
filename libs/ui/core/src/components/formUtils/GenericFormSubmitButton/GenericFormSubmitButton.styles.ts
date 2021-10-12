import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-ui-theme';

export const useStyles = makeStyles({
  btn: {
    '& > span > svg': {
      color: variables.secondaryColor,
    },
    '&:hover': {
      backgroundColor: variables.secondaryColor,
      color: variables.hoverTextColor,
      '& > span > svg': {
        color: variables.primaryColor,
      }
    },

  }
});
