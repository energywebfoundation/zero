import { Button, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OverridableStringUnion } from '@material-ui/types';
import { ButtonPropsColorOverrides } from '@material-ui/core/Button/Button';
import { useCallToActionButtonStyles } from './CallToActionButton.styles';
import { ReactNode } from 'react';
import { SxProps } from '@material-ui/system';

export interface CallToActionButtonProps {
  onClick?: () => void;
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >;
  text?: string;
  translateKey?: string;
  disableRootStyles?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

export const CallToActionButton = ({
  translateKey,
  text,
  disableRootStyles = false,
  fullWidth = false,
  color = 'secondary',
  onClick,
  startIcon,
  endIcon,
  sx,
  disabled = false,
}: CallToActionButtonProps) => {
  const { t } = useTranslation();
  const styles = useCallToActionButtonStyles();
  return (
    <Button
      onClick={onClick ?? onClick}
      fullWidth={fullWidth}
      variant={'contained'}
      color={color}
      className={disableRootStyles ? '' : styles.root}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={sx}
      disabled={disabled}
    >
      {text ?? (translateKey && t(translateKey))}
    </Button>
  );
};
