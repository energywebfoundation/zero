import Grid from '@material-ui/core/Grid';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import FolderOutlined from '@material-ui/icons/FolderOutlined';
import UploadSharp from '@material-ui/icons/UploadSharp';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
// import { FileListContainer } from '../../../containers';
import { useStyles } from './FileUpload.styles';

const MB = 1024 * 1024;

const UPLOAD_SIZE_LIMIT_PDF = 128 * MB;

export enum AcceptedFileTypeEnum {
  DOCUMENT_PDF = 'application/pdf',
  DOCUMENT_XLS = 'application/vnd.ms-excel',
  DOCUMENT_WORD = 'application/msword',
  DOCUMENT_XML = 'text/xml',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
}

export interface FileUploadProps {
  handleAcceptedFilesChange: (files: File[]) => void;
  handleSubmitSelection: (fileIdList: string[]) => void;
  title?: string;
  disableDrop?: boolean;
  withFileList?: boolean;
  uploadButtonText?: string;
  acceptedFileTypeList?: AcceptedFileTypeEnum[];
  isProcessing?: boolean;
}

export const FileUpload = ({
  isProcessing = false,
  handleAcceptedFilesChange,
  title,
  disableDrop = true,
  withFileList,
  handleSubmitSelection,
  uploadButtonText,
}: FileUploadProps) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noDrag: disableDrop,
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
    <div>
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
            {/* should not be user here */}
            {/* <FileListContainer
              handleCancel={useCallback(() => {
                setIsFileListModalOpen(false);
              }, [setIsFileListModalOpen])}
              handleSubmitSelection={(fileIdList) => {
                handleSubmitSelection(fileIdList);
                setIsFileListModalOpen(false);
              }}
              open={isFileListModalOpen}
            /> */}
            {withFileList && (
              <Button
                onClick={() => {
                  setIsFileListModalOpen(true);
                }}
                className={styles.buttonStyles}
                startIcon={<FolderOutlined color={'secondary'} />}
                variant={'contained'}
              >
                {/* should be localized */}
                Choose from uploaded documents
              </Button>
            )}

            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Button
                disabled={isProcessing}
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
                {/* should be localized */}
                {!isProcessing
                  ? uploadButtonText ?? 'Upload from your computer'
                  : 'Upload in progress'}
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};