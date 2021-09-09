import { Container, GlobalStyles } from '@material-ui/core';
import { ReactNode, ReactNodeArray } from 'react';
import { TopNavBarContainer } from '@energy-web-zero/ui/account';

/* eslint-disable-next-line */
export interface LayoutWithTopbarProps {
  children: ReactNode | ReactNodeArray;
  bgColor?: string;
  disableTopbar?: boolean;
}

export const LayoutWithTopbarContainer = ({
  children,
  bgColor,
  disableTopbar,
}: LayoutWithTopbarProps) => {
  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: bgColor } }} />
      {!disableTopbar && <TopNavBarContainer />}
      <Container fixed>{children}</Container>
    </>
  );
};

export default LayoutWithTopbarContainer;
