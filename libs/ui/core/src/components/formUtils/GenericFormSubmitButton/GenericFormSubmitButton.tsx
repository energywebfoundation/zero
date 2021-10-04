import ChevronRight from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FC, useContext } from 'react';
import { GenericFormContext } from '../../../providers';
import { useStyles } from './GenericFormSubmitButton.styles';

export interface GenericFormSubmitButtonProps {
  name: string;
}

export const GenericFormSubmitButton: FC<GenericFormSubmitButtonProps> = ({ name }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const context = useContext(GenericFormContext);

  return (
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
      {/* should be fixed to more generic */}
      {name === 'sign-in'
        ? t('forms.signInBtnText')
        : t('forms.signUpBtnText')}
    </Button>
  );
};
