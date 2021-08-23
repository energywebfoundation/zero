import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    popoverText: {
      fontSize: '12px',
      fontFamily: 'Rajdhani',
      fontWeight: 600,
      textAlign: 'center',
    },
  };
});
