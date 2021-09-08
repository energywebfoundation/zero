import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Add } from '@material-ui/icons';
import { useStyles } from './generic-form-cancel-button.styles';
import { variables } from 'libs/ui/theme/src/lib/config/variables';
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
        sx={{ background: '#ffffff' }}
        onClick={handleCancel}
        className={styles.button}
        variant={'contained'}
        startIcon={<Add style={{ fill: variables.secondaryColor }} />}
      >
        {t('forms.cancelBtnText')}
      </Button>
    </StyledGenericFormCancelButton>
  );
};

export default GenericFormCancelButton;
