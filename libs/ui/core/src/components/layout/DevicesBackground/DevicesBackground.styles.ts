import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  svgBg: {
    zIndex: 1,
    overflow: 'auto'
  },
  bg: {
    margin: 40
  },
  content: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
})
