import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useCallToActionButtonStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: '10px 40px',
      // should remove hardcoded colors
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
      },
    },
    icon: {
      '&:hover': {
        color: 'white',
      },
    },
  };
});
