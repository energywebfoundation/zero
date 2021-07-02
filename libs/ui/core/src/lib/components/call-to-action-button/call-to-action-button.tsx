import PersonAddAltOutlinedIcon from '@material-ui/icons/PersonAddAltOutlined';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCallToActionButtonStyles } from './call-to-action-button.styles';

/* eslint-disable-next-line */
export interface CallToActionButtonProps {
  text?: string;
  translateKey?: string;
}

export const CallToActionButton = ({
  translateKey,
  text,
}: CallToActionButtonProps) => {
  const { t } = useTranslation();
  const styles = useCallToActionButtonStyles();
  return (
    <Button
      className={styles.root}
      endIcon={
        <PersonAddAltOutlinedIcon className={styles.icon} color={'secondary'} />
      }
    >
      {text ?? (translateKey && t(translateKey))}
    </Button>
  );
};

export default CallToActionButton;
