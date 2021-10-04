import { makeStyles } from '@material-ui/styles';

export const useTopNavBarStyles = makeStyles({
  // should remove hardcoded colors
  root: {
    backgroundColor: '#2D1155',
    height: '98px',
    padding: '15px 0',
  },
  NavLinkItem: { marginLeft: '30px', marginRight: '30px' },
});
