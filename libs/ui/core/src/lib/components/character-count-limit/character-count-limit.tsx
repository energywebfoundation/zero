import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

/* eslint-disable-next-line */
export interface CharacterCountLimitProps {
  characterCountLimit: number;
  value: string | null;
}

const StyledCharacterCountLimit = styled.div``;

export const CharacterCountLimit = ({
  characterCountLimit,
  value,
}: CharacterCountLimitProps) => {
  const charactersLeftValue = value
    ? characterCountLimit - value.length
    : characterCountLimit;
  return (
    <StyledCharacterCountLimit>
      <Typography
        lineHeight={'16px'}
        fontSize={'14px'}
        fontWeight={700}
        color={charactersLeftValue >= 0 ? '#703CBB' : 'error'}
      >
        <InfoOutlined sx={{ position: 'relative', top: '6px', mr: '5px' }} />
        {charactersLeftValue} characters left
      </Typography>
    </StyledCharacterCountLimit>
  );
};

export default CharacterCountLimit;
