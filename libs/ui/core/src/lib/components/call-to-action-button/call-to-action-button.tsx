import PersonAddAltOutlinedIcon from '@material-ui/icons/PersonAddAltOutlined';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCallToActionButtonStyles } from './call-to-action-button.styles';
import { OverridableStringUnion } from '@material-ui/types';
import { ButtonPropsColorOverrides } from '@material-ui/core/Button/Button';

/* eslint-disable-next-line */
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
      endIcon={
        <PersonAddAltOutlinedIcon className={styles.icon} color={'secondary'} />
      }
    >
      {text ?? (translateKey && t(translateKey))}
    </Button>
  );
};

export default CallToActionButton;
