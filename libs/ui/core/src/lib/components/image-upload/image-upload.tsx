import styled from '@emotion/styled';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ImageUploadProps {
  handleOnDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  helpText?: string;
  handleFileValidationError: (
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  isProcesssingUpload?: boolean;
}

const StyledImageUpload = styled(Box)`
  display: flex;
  flex-grow: 1;
  align-content: center;
  justify-content: center;
  background-color: #f6f3f9;
  padding: 40px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='rgb(0, 208, 138)' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 5px;
`;

export const ImageUpload = ({
  helpText,
  handleFileValidationError,
  handleOnDrop,
}: ImageUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOnDrop,
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024,
    onDropRejected: handleFileValidationError,
    multiple: true,
    validator: (file) => {
      return null;
    },
  });

  const { t } = useTranslation();
  return (
    <StyledImageUpload>
      <Typography>{helpText}</Typography>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography
          fontSize={'24px'}
          fontWeight={700}
          textAlign={'center'}
          color={'secondary'}
          lineHeight={'31px'}
        >
          {t('components.ImageUpload.dragDropImage')}
        </Typography>
        <Box
          sx={{ color: 'primary.main' }}
          fontSize={'20px'}
          fontWeight={700}
          textAlign={'center'}
        >
          <Box lineHeight={'24px'} fontSize={'20px'} mb={'9px'}>
            or
          </Box>
          <Button
            endIcon={<Add />}
            sx={{
              paddingLeft: '60px',
              paddingRight: '60px',
              paddingTop: '7px',
              paddingBottom: '7px',
            }}
            variant={'contained'}
          >
            {t('components.ImageUpload.addImage')}
          </Button>
        </Box>
      </div>
    </StyledImageUpload>
  );
};

export default ImageUpload;
