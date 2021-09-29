import { makeStyles } from '@material-ui/styles';
import { GenericFormFieldContainerProps } from './GenericFormFieldContainer';

export const useStyles = makeStyles({
  root: {
    height: (props: GenericFormFieldContainerProps) =>
      props.contentHeight ? 'auto' : '70px',
  }
});
