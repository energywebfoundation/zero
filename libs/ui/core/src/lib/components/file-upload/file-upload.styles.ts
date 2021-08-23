import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    buttonStyles: {
      fontWeight: 700,
      mr: 2,
      color: 'primary.main',
      '&:hover': {
        color: '#fff',
      },
      backgroundColor: '#fff',
    },
  };
});
