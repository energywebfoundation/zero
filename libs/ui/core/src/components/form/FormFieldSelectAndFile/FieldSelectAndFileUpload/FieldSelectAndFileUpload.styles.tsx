import styled from "@emotion/styled";
import { darken, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  removeBtn: {
    backgroundColor: theme.palette.background.paper,
    padding: '14px',
    minWidth: '55px',
    '&:hover': {
      backgroundColor: darken(theme.palette.background.paper, 0.05)
    }
  }
}));

export const StyledFileName = styled(Typography)`
font-size: 18px;
font-weight: 600;
margin-left: 18px;
`
