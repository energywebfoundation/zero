import styled from '@emotion/styled';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Add } from '@material-ui/icons';
import { useStyles } from './generic-form-cancel-button.styles';
import { variables } from '@energyweb/zero-ui-theme';
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
    </StyledGenericFormCancelButton>
  );
};

export default GenericFormCancelButton;
