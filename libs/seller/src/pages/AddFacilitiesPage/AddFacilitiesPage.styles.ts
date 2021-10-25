import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main
  },
}));

