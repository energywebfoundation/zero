import { FC } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useStyles } from './GenericFormCancelButton.styles';
import clsx from 'clsx';

export interface GenericFormCancelButtonProps {
  handleCancel: () => void;
  label: string;
  className?: string;
}

export const GenericFormCancelButton: FC<GenericFormCancelButtonProps> = ({
  handleCancel, label, className
}) => {
  const styles = useStyles();

  return (
    <div>
      <Button
        onClick={handleCancel}
        className={clsx(styles.button, className)}
        variant={'contained'}
        startIcon={<Add/>}
      >
        {label}
      </Button>
    </div>
  );
};
