import ChevronRight from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FC, useContext } from 'react';
import { GenericFormContext } from '../../../providers';

export interface GenericFormSubmitButtonProps {
  name: string;
  className?: string;
}

export const GenericFormSubmitButton: FC<GenericFormSubmitButtonProps> = ({ name, className }) => {
  const { t } = useTranslation();
  const context = useContext(GenericFormContext);

  return (
    <Button
      className={className}
      disabled={context?.isSubmitting}
      type="submit"
      variant={'contained'}
      color={'primary'}
      endIcon={<ChevronRight />}
    >
      {/* should be fixed to more generic */}
      {name === 'sign-in'
        ? t('forms.signInBtnText')
        : t('forms.signUpBtnText')}
    </Button>
  );
};
