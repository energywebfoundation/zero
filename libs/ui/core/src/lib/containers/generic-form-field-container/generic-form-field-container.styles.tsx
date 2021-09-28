import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { GenericFormFieldContainerProps } from '@energyweb/zero-ui-core';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: (props: GenericFormFieldContainerProps) =>
        props.contentHeight ? 'auto' : '70px',
    },
  };
});
