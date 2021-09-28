import { makeStyles } from '@material-ui/styles';
import { variables } from '@energyweb/zero-ui-theme';


export const useStyles = makeStyles((theme) => {
  return {
    icon: {
      color: variables.secondaryColor,
      '&:hover': {
      color: variables.primaryColor,
      }
    },
    btn: {
      '&:hover': {
        backgroundColor: variables.secondaryColor,
        color: variables.hoverTextColor
      }
    }
  };
});
