import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper/Paper';
import { ReactNode, ReactNodeArray } from 'react';

/* eslint-disable-next-line */
export interface GenericFormCardProps {
  children: ReactNode | ReactNodeArray;
}

const StyledGenericFormCard = styled.div``;

export const GenericFormCard = ({ children }: GenericFormCardProps) => (
  <StyledGenericFormCard>
    <Paper sx={{ p: '32px 50px' }}>{children}</Paper>
  </StyledGenericFormCard>
);

export default GenericFormCard;
