import { Box, Modal, Theme, Typography } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export interface GenericModalProps {
  open: boolean;
  handleOnClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  p?: number | string;
  maxHeight?: string;
}

export const GenericModal = ({
  open,
  handleOnClose,
  title,
  children,
  width = '50vw',
  maxHeight = '60vh',
  p = 0,
}: GenericModalProps) => {

  // should move styling out of component
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
    <div>
      <Modal open={open} onClose={handleOnClose}>
        <Box sx={style}>
          {title && (
            <Typography
            //  should remove hardcoded colors
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
    </div>
  );
};
