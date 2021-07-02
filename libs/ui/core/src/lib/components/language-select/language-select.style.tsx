import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      color: '#9B95BD',
      textTransform: 'uppercase',
    },
  };
});
