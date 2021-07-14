import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/system';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    weak: { fontWeight: 600, color: 'red' },
    soso: { color: 'yellow' },
    ok: { color: 'green' },
  };
});
