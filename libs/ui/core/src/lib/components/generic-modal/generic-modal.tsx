import styled from '@emotion/styled';
import { Box, Modal, Theme, Typography } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

/* eslint-disable-next-line */
export interface GenericModalProps {
  open: boolean;
  handleOnClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  p?: number | string;
  maxHeight?: string;
}

const StyledGenericModal = styled.div``;

export const GenericModal = ({
  open,
  handleOnClose,
  title,
  children,
  width = '50vw',
  maxHeight = '60vh',
  p = 0,
}: GenericModalProps) => {
  const style: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width,
    p,
  };

  return (
    <StyledGenericModal>
      <Modal open={open} onClose={handleOnClose}>
        <Box sx={style}>
          {title && (
            <Typography
              color={'#fff'}
              bgcolor={'primary.main'}
              p={2}
              variant="h6"
              component="h6"
            >
              {title}
            </Typography>
          )}
          <SimpleBar style={{ maxHeight }}>{children}</SimpleBar>
        </Box>
      </Modal>
    </StyledGenericModal>
  );
};

export default GenericModal;
