import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { FC } from 'react';

export interface CharacterCountLimitProps {
  characterCountLimit: number;
  value: string | null;
}

export const CharacterCountLimit: FC<CharacterCountLimitProps> = ({
  characterCountLimit,
  value,
}) => {
  const charactersLeftValue = value
    ? characterCountLimit - value.length
    : characterCountLimit;
  return (
    <div>
      <Typography
        lineHeight={'16px'}
        fontSize={'14px'}
        fontWeight={700}
        // should remove hardcoded colors
        color={charactersLeftValue >= 0 ? '#703CBB' : 'error'}
      >
        <InfoOutlined sx={{ position: 'relative', top: '6px', mr: '5px' }} />
        {/* should localize */}
        {charactersLeftValue} characters left
      </Typography>
    </div>
  );
};
