import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    buttonStyles: {
      fontWeight: 700,
      mr: 2,
      color: 'primary.main',
      // should remove hardcoded colors
      '&:hover': {
        color: '#fff',
      },
      backgroundColor: '#fff',
    }
});
