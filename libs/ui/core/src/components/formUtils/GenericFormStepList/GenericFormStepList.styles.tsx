import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: 'calc(100% - 16px)',
      '& .active *': {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      },
    },
    container: {
      alignItems: 'center'
    },
    circle: {
      height: '40px',
      width: '40px',
      fontSize: '20px',
      borderRadius: '50%',
      borderWidth: '2px',
      borderStyle: 'solid',
      textAlign: 'center',
      lineHeight: '38px',
      borderColor: theme.palette.primary.main,
      marginBottom: '8px',
    },
    stepLabel: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '15.3px',
    },
  };
});
