import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Add } from '@material-ui/icons';
import { useStyles } from './generic-form-cancel-button.styles';

/* eslint-disable-next-line */
export interface GenericFormCancelButtonProps {
  handleCancel: () => void;
}

const StyledGenericFormCancelButton = styled.div``;

export const GenericFormCancelButton = ({
  handleCancel,
}: GenericFormCancelButtonProps) => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <StyledGenericFormCancelButton>
      <Button
        onClick={handleCancel}
        className={styles.button}
        variant={'contained'}
        startIcon={<Add />}
      >
        {t('forms.cancelBtnText')}
      </Button>
    </StyledGenericFormCancelButton>
  );
};

export default GenericFormCancelButton;
