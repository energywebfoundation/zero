import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    buttonStyles: {
      fontWeight: 700,
      mr: 2,
      color: 'primary.main',
      '&:hover': {
        color: '#fff',
      },
      backgroundColor: '#fff',
    }
});
