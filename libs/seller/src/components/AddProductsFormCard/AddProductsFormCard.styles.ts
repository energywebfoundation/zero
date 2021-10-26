import { Theme, alpha } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles<Theme>(theme => ({
  card: {
    border: `1px solid ${alpha(theme.palette.text.primary, 0.5)}`,
    padding: '1.5rem',
    borderRadius: 5,
    margin: '1rem 0 0.5rem'
  },
  removeBtnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: "100%",
    paddingTop: theme.spacing(1)
  }
}))
