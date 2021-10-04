import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/system';
import { GuideCardProps } from './GuideCard';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    iconBox: {
      marginBottom: '20px',
      textAlign: 'center',
      '& svg': { fontSize: '36px' },
      color: (props: GuideCardProps) =>
        !props.disabled
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
    disabledOverlay: {
      opacity: 0.5,
      // should remove hardcoded colors
      backgroundColor: '#fff',
      bottom: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
  };
});
