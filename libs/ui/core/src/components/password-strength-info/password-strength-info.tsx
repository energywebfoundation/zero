import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid/Grid';
import { LinearProgress, Typography } from '@material-ui/core';
import zxcvbn from 'zxcvbn';
import { FC, useContext, useState } from 'react';
import { GenericFormContext } from '../../lib/providers';
import { useInterval } from 'react-use';
import { useStyles } from './password-strength-info.styles';
import { ClassNameMap } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface PasswordStrengthInfoProps {
  textString: string;
}

const StyledPasswordStrengthInfo = styled.div`
  color: black;
`;

export enum PasswordStrengthScoreEnum {
  VeryWeak,
  Weak,
  StillWeak,
  Good,
  Strong,
}

const scoreToClassName = (
  classNameMap: ClassNameMap<'ok' | 'soso' | 'weak'>,
  score: PasswordStrengthScoreEnum
) => {
  switch (score) {
    case PasswordStrengthScoreEnum.VeryWeak:
    case PasswordStrengthScoreEnum.Weak:
      return classNameMap.weak;
    case PasswordStrengthScoreEnum.Good:
    case PasswordStrengthScoreEnum.Strong:
      return classNameMap.ok;
    default:
      return classNameMap.weak;
  }
};

export const PasswordStrengthInfo = () => {
  const context = useContext(GenericFormContext);

  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);
  useInterval(() => {
    const { score } = zxcvbn(context?.getValues('password') ?? '');
    setPasswordStrengthScore(score);
  }, 500);
  const styles = useStyles();

  return context?.dirtyFields['password'] ? (
    <StyledPasswordStrengthInfo>
      <Grid columnSpacing={'40px'} mb={'40px'} container>
        <Grid item sm={6}>
          <Typography color={'primary'} mb={'10px'} variant={'body1'}>
            Password strength:{' '}
            <span style={{ fontWeight: 700 }}>
              <StrengthInfoText
                className={scoreToClassName(styles, passwordStrengthScore)}
                score={passwordStrengthScore}
              />
            </span>
          </Typography>
          <LinearProgress
            className={scoreToClassName(styles, passwordStrengthScore)}
            variant={'determinate'}
            value={passwordStrengthScore * 25}
            color={'primary'}
          />
        </Grid>
      </Grid>
    </StyledPasswordStrengthInfo>
  ) : null;
};

export default PasswordStrengthInfo;

const StrengthInfoText: FC<{ score: number; className: string }> = ({
  score,
  className,
}) => {
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
