import { Box, IconButton } from '@material-ui/core';
import { ImagePlaceholderDark, ImagePlaceholderLight } from '@energyweb/zero-ui-assets';
import { Delete } from '@material-ui/icons';
import styled from '@emotion/styled';
import { useState } from 'react';
import { ProcessingContainer } from '../../layout';
import { ConfirmDeleteImageItemModal } from './ConfirmDeleteImageItemModal';

const StyledIconButton = styled(IconButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`

export interface ImageItemProps {
  fileId: string;
  src: string;
  fileDeleteHandler?: (fileId: string) => Promise<void> | void;
  isProcessing?: boolean;
  alt?: string;
  showDarkPlaceholder?: boolean;
  showLightPlaceholder?: boolean;
  setImgMaxHeightTo?: string;
};

export const ImageItem = ({
  alt,
  src,
  fileId,
  fileDeleteHandler,
  isProcessing,
  showDarkPlaceholder,
  showLightPlaceholder,
  setImgMaxHeightTo = '184px',
}: ImageItemProps) => {
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

  const openConfirmDeleteModal = () => setFileIdToDelete(fileId);
  const closeConfirmDeleteModal = () => setFileIdToDelete(null);
  const handleDelete = async () => {
    fileDeleteHandler && await fileDeleteHandler(fileId);
    closeConfirmDeleteModal();
  };

  return (
    <>
      <ProcessingContainer isProcessing={Boolean(isProcessing)}>
        {!src && (showDarkPlaceholder || showLightPlaceholder) ? (
          <Box
            borderRadius={'5px'}
            bgcolor={showLightPlaceholder ? '#F6EFFF' : 'primary'}
            maxHeight={setImgMaxHeightTo}
            alignContent={'center'}
            display={'flex'}
          >
            {showLightPlaceholder && (
              <ImagePlaceholderLight />
            )}
            {showDarkPlaceholder && (
              <ImagePlaceholderDark />
            )}
          </Box>
        ) : (
          <Box>
            {fileDeleteHandler &&
            <StyledIconButton onClick={openConfirmDeleteModal}>
              <Delete color="error" />
            </StyledIconButton>}
            <img
              alt={alt}
              style={{
                width: 'auto',
                maxHeight: '184px',
              }}
              src={src}
            />
          </Box>
        )}
      </ProcessingContainer>
      {fileDeleteHandler &&
      <ConfirmDeleteImageItemModal
        open={!!fileIdToDelete}
        handleClose={closeConfirmDeleteModal}
        handleDelete={handleDelete}
      />}
    </>
  );
}
