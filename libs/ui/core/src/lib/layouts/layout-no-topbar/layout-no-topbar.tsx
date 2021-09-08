import styled from '@emotion/styled';
import { ReactNode, ReactNodeArray } from 'react';

/* eslint-disable-next-line */
export interface LayoutNoTopbarProps {
  children: ReactNode | ReactNodeArray;
}

const StyledLayoutNoTopbar = styled.div``;

export function LayoutNoTopbar({ children }: LayoutNoTopbarProps) {
  return <StyledLayoutNoTopbar>{children}</StyledLayoutNoTopbar>;
}

export default LayoutNoTopbar;
