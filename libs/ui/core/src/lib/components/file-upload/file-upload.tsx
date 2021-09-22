import styled from '@emotion/styled';
import Grid from '@material-ui/core/Grid';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import FolderOutlined from '@material-ui/icons/FolderOutlined';
import UploadSharp from '@material-ui/icons/UploadSharp';
import { useStyles } from './file-upload.styles';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import FileListContainer from '../../containers/file-list-container/file-list-container';

const MB = 1024 * 1024;

const UPLOAD_SIZE_LIMIT_PDF = 128 * MB;

export enum AcceptedFileTypeEnum {
  DOCUMENT_PDF = '',
  DOCUMENT_XSL = '',
  DOCUMENT_WORD = '',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
}

export interface FileUploadProps {
  title?: string;
  disableDrop?: boolean;
  handleAcceptedFilesChange: (files: File[]) => void;
  withFileList?: boolean;
  handleSubmitSelection: (fileIdList: string[]) => void;
  uploadButtonText?: string;
  acceptedFileTypeList?: AcceptedFileTypeEnum[];
  isProcessing: boolean;
}

const StyledFileUpload = styled.div``;

export const FileUpload = ({
  acceptedFileTypeList,
  isProcessing,
  handleAcceptedFilesChange,
  title,
  disableDrop = true,
  withFileList,
  handleSubmitSelection,
  uploadButtonText,
}: FileUploadProps) => {
  const [disableUpload, setDisableUpload] = useState(false);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noDrag: disableDrop,
    disabled: disableUpload,
    multiple: true,
    maxSize: UPLOAD_SIZE_LIMIT_PDF,
  });
  const [isFileListModalOpen, setIsFileListModalOpen] = useState(false);
  useEffect(() => {
    if (acceptedFiles?.length) {
      handleAcceptedFilesChange(acceptedFiles);
    }
  }, [acceptedFiles]);
  const styles = useStyles();
  return (
    <StyledFileUpload>
      <Grid container flexGrow={1}>
        {title && (
          <Grid item xs={12} sm={2}>
            <Typography lineHeight={'36px'} color={'primary'} fontWeight={700}>
              {title}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={8}>
          <Box display={'flex'}>
            <FileListContainer
              handleCancel={useCallback(() => {
                setIsFileListModalOpen(false);
              }, [setIsFileListModalOpen])}
              handleSubmitSelection={(fileIdList) => {
                handleSubmitSelection(fileIdList);
                setIsFileListModalOpen(false);
              }}
              open={isFileListModalOpen}
            />
            {withFileList && (
              <Button
                onClick={() => {
                  setIsFileListModalOpen(true);
                }}
                className={styles.buttonStyles}
                startIcon={<FolderOutlined color={'secondary'} />}
                variant={'contained'}
              >
                Choose from uploaded documents
              </Button>
            )}

            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Button
                disabled={disableUpload || isProcessing}
                sx={{ ml: 2 }}
                className={styles.buttonStyles}
                variant={'contained'}
                startIcon={
                  !isProcessing ? (
                    <UploadSharp color={'secondary'} />
                  ) : (
                    <CircularProgress size={'16px'} color={'secondary'} />
                  )
                }
              >
                {!isProcessing
                  ? uploadButtonText ?? 'Upload from your computer'
                  : 'Upload in progress'}
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </StyledFileUpload>
  );
};

export default FileUpload;
