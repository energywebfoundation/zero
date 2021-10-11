import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PersonAccept } from '@energyweb/zero-ui-assets';
import { OverridableStringUnion } from '@material-ui/types';
import { ButtonPropsColorOverrides } from '@material-ui/core/Button/Button';
import { useCallToActionButtonStyles } from './CallToActionButton.styles';

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
}

export const CallToActionButton = ({
  translateKey,
  text,
  disableRootStyles = false,
  fullWidth = false,
  color = 'secondary',
  onClick,
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
      endIcon={<PersonAccept />}
    >
      {text ?? (translateKey && t(translateKey))}
    </Button>
  );
};
