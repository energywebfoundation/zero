import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useTopNavBarStyles = makeStyles((theme: Theme) => {
  return {
    root: { padding: '20px 0' },
    NavLinkItem: { marginLeft: '30px', marginRight: '30px' },
  };
});
