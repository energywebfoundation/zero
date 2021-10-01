import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid/Grid';
import { LinearProgress, Typography } from '@material-ui/core';
import zxcvbn from 'zxcvbn';
import { useContext, useState } from 'react';
import { useInterval } from 'react-use';
import { ClassNameMap } from '@material-ui/styles';
import { GenericFormContext } from '../../../providers';
import { useStyles } from './PasswordStrengthInfo.styles';
import { PasswordStrengthInfoText } from '../PasswordStrengthInfoText';

export interface PasswordStrengthInfoProps {
  textString: string;
}

const StyledDiv = styled.div`
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
    <StyledDiv>
      <Grid columnSpacing={'40px'} mb={'40px'} container>
        <Grid item sm={6}>
          <Typography color={'primary'} mb={'10px'} variant={'body1'}>
            {/* should be localized */}
            Password strength:{' '}
            <span style={{ fontWeight: 700 }}>
              <PasswordStrengthInfoText
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
    </StyledDiv>
  ) : null;
};
