import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useTopNavBarStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      backgroundColor: '#2D1155',
      height: '98px',
      padding: '15px 0',
    },
    NavLinkItem: { marginLeft: '30px', marginRight: '30px' },
  };
});
