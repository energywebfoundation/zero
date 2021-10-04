import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Add } from '@material-ui/icons';
import { variables } from '@energyweb/zero-ui-theme';
import { useStyles } from './GenericFormCancelButton.styles';

export interface GenericFormCancelButtonProps {
  handleCancel: () => void;
}

export const GenericFormCancelButton: FC<GenericFormCancelButtonProps> = ({
  handleCancel,
}) => {
  const styles = useStyles();
  // should not be a part of generic core lib
  const { t } = useTranslation();

  return (
    <div>
      <Button
        sx={{
          background: variables.bodyBackgroundColor,
          '&:hover': {
            backgroundColor: variables.secondaryColor,
          },
        }}
        onClick={handleCancel}
        className={styles.button}
        variant={'contained'}
        startIcon={<Add className={styles.icon} />}
      >
        {t('forms.cancelBtnText')}
      </Button>
    </div>
  );
};
