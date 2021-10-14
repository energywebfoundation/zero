import Grid from '@material-ui/core/Grid';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import FolderOutlined from '@material-ui/icons/FolderOutlined';
import UploadSharp from '@material-ui/icons/UploadSharp';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { CallToActionButton } from '../../layout';
import { StoredFile } from '../FileUploadContainer';
import { FileListContainer } from '../FileListContainer';

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
  handleSubmitSelection: (fileIdList: StoredFile[]) => void;
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
              <CallToActionButton
                translateKey='forms.chooseFromUploadedDocs'
                onClick={() => {
                  setIsFileListModalOpen(true);
                }}
                startIcon={<FolderOutlined />}
              />
            )}

            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <CallToActionButton
                sx={{ ml: 2 }}
                disabled={isProcessing}
                startIcon={
                  !isProcessing ? (
                    <UploadSharp color={'secondary'} />
                  ) : (
                    <CircularProgress size={'16px'} color={'secondary'} />
                  )
                }
                translateKey={!isProcessing
                  ? 'forms.uploadFromComputer'
                  : 'forms.uploadInProgress'
                }
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
