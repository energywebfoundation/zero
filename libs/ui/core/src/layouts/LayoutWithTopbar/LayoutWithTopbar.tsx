import { Container, GlobalStyles } from '@material-ui/core';
import { ReactNode, ReactNodeArray } from 'react';
import TopNavBarContainer from '../../containers/TopNavBarContainer/TopNavBarContainer';

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
      <Container fixed sx={{ pt: '98px' }}>
        {children}
      </Container>
    </>
  );
};

export default LayoutWithTopbarContainer;
