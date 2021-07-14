import styled from '@emotion/styled';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './generic-form-submit-button.styles';
import { GenericFormContext } from '../../lib/providers';
import { useContext } from 'react';

/* eslint-disable-next-line */
export interface GenericFormSubmitButtonProps {}

const StyledGenericFormSubmitButton = styled.div``;

export const GenericFormSubmitButton = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const context = useContext(GenericFormContext);
  return (
    <StyledGenericFormSubmitButton>
      <Button
        disabled={
          !context?.isDirty || context?.isSubmitting || !context?.isValid
        }
        type="submit"
        variant={'contained'}
        color={'primary'}
        endIcon={<ChevronRight className={styles.icon} />}
      >
        {t('forms.submitBtnText')}
      </Button>
    </StyledGenericFormSubmitButton>
  );
};

export default GenericFormSubmitButton;
