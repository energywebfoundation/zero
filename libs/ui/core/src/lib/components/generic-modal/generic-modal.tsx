import styled from '@emotion/styled';
import { Box, Modal, Theme, Typography } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface GenericModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  p?: number | string;
}

const StyledGenericModal = styled.div``;

export const GenericModal = ({
  open,
  handleClose,
  title,
  children,
  width = '50vw',
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {title && (
            <Typography
              color={'secondary.light'}
              bgcolor={'primary.main'}
              p={2}
              variant="h6"
              component="h6"
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Modal>
    </StyledGenericModal>
  );
};

export default GenericModal;