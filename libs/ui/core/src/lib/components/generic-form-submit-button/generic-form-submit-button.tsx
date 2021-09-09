import styled from '@emotion/styled';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './generic-form-submit-button.styles';
import { GenericFormContext } from '../../providers';
import { useContext } from 'react';

/* eslint-disable-next-line */
export interface GenericFormSubmitButtonProps {
  name: string;
}

const StyledGenericFormSubmitButton = styled.div``;

export const GenericFormSubmitButton = (prop: GenericFormSubmitButtonProps) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const context = useContext(GenericFormContext);
  return (
    <StyledGenericFormSubmitButton>
      <Button
        className={styles.btn}
        disabled={
          !context?.isDirty || context?.isSubmitting || !context?.isValid
        }
        type="submit"
        variant={'contained'}
        color={'primary'}
        endIcon={<ChevronRight className={styles.icon} />}
      >
        {prop.name === 'sign-in'
          ? t('forms.signInBtnText')
          : t('forms.signUpBtnText')}
      </Button>
    </StyledGenericFormSubmitButton>
  );
};

export default GenericFormSubmitButton;
