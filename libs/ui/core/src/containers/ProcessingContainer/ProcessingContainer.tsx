import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export interface ProcessingContainerProps {
  children: ReactElement;
  isProcessing: boolean;
  maxHeight?: string;
}

const StyledProcessingContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`;

export const ProcessingContainer = ({
  children,
  maxHeight,
  isProcessing,
}: ProcessingContainerProps) => (
  <StyledProcessingContainer maxHeight={maxHeight}>
    {isProcessing && (
      <Box
        sx={{
          backgroundColor: 'rgba(255,255,255,.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <CircularProgress color={'primary'} />
      </Box>
    )}
    {children}
  </StyledProcessingContainer>
);

export default ProcessingContainer;
