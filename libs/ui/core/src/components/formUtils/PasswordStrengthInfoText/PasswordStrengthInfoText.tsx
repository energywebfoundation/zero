import { FC } from "react";
import { useTranslation } from "react-i18next";

export const PasswordStrengthInfoText: FC<{ score: number; className?: string }> = ({
  score,
  className,
}) => {
  // should not be in core lib
  const { t } = useTranslation();

  switch (score) {
    case 1:
      return (
        <span className={className}>
          {t('components.PasswordStrengthInfo.weak')}
        </span>
      );
    case 2:
      return (
        <span className={className}>
          {t('components.PasswordStrengthInfo.almostOk')}
        </span>
      );
    case 3:
      return (
        <span className={className}>
          {t('components.PasswordStrengthInfo.goodPassword')}
        </span>
      );
    case 4:
      return (
        <span className={className}>
          {t('components.PasswordStrengthInfo.strongPassword')}
        </span>
      );
    default:
      return (
        <span className={className}>
          {t('components.PasswordStrengthInfo.veryWeak')}
        </span>
      );
  }
};
