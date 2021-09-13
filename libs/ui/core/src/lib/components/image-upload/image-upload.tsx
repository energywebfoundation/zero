import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { useImageUploadEffects } from './image-upload.effects';

/* eslint-disable-next-line */
export interface ImageUploadProps extends UseFormRegisterReturn {
  helpText?: string;
}

const StyledImageUpload = styled(Box)`
  display: flex;
  flex-grow: 1;
`;

export const ImageUpload = ({ helpText }: ImageUploadProps) => {
  const { submitHandler } = useImageUploadEffects();
  const [imageList, setImageList] = useState<
    Array<{ img: string; title: string }>
  >([
    { img: 'https://picsum.photos/160/160', title: '' },
    { img: 'https://picsum.photos/160/160', title: '' },
    { img: 'https://picsum.photos/160/160', title: '' },
  ]);
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      return;
      acceptedFiles.forEach((file) => {
        submitHandler({ file }).then();
      });

      console.log(acceptedFiles, fileRejections, event);
    },
    []
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <StyledImageUpload>
      <Grid container>
        <Grid item sm={6}>
          <Typography>{helpText}</Typography>
          <div
            {...getRootProps()}
            style={{ backgroundColor: '#F6F3F9', padding: '40px' }}
          >
            <input {...getInputProps()} />
            <Typography
              fontSize={'24px'}
              fontWeight={700}
              textAlign={'center'}
              color={'secondary'}
              lineHeight={'31px'}
            >
              Drag and drop image anywhere
            </Typography>
            <Box
              sx={{ color: 'primary.main' }}
              fontSize={'20px'}
              fontWeight={700}
              textAlign={'center'}
            >
              <Box lineHeight={'24px'} fontSize={'20px'} my={'9px'}>
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
                Add image
              </Button>
            </Box>
          </div>
        </Grid>
        <Grid item sm={6}></Grid>
      </Grid>
    </StyledImageUpload>
  );
};

export default ImageUpload;
