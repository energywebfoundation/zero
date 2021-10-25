import Grid from '@material-ui/core/Grid';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import FolderOutlined from '@material-ui/icons/FolderOutlined';
import UploadSharp from '@material-ui/icons/UploadSharp';
import { useDropzone } from 'react-dropzone';
import { UseMutateAsyncFunction } from 'react-query';
import { CallToActionButton } from '../../layout';
import { FileListContainer } from '../FileListContainer';
import { StoredFile, UploadFile, UploadFileResponse, useFileUploadEffects } from './FileUpload.effects';

const MB = 1024 * 1024;
export const UPLOAD_SIZE_LIMIT_PDF = 128 * MB;

export enum AcceptedFileTypeEnum {
  DOCUMENT_PDF = 'application/pdf',
  DOCUMENT_XLS = 'application/vnd.ms-excel',
  DOCUMENT_WORD = 'application/msword',
  DOCUMENT_XML = 'text/xml',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
}

export interface FileUploadProps {
  mutateUpload: UseMutateAsyncFunction<UploadFileResponse, unknown, {
    data: UploadFile;
  }, unknown>;
  handleSubmitSelection: (fileIdList: string) => Promise<void>;
  handleFileListChanged: (fileIdList: StoredFile[]) => void;
  title?: string;
  disableDrop?: boolean;
  withFileList?: boolean;
  uploadButtonText?: string;
  acceptedFileTypeList?: AcceptedFileTypeEnum[];
  isProcessing?: boolean;
  selectOnUploaded?: boolean;
}

export const FileUpload = ({
  title,
  mutateUpload,
  handleFileListChanged,
  selectOnUploaded,
  withFileList,
  handleSubmitSelection,
  disableDrop = true,
  isProcessing = false,
}: FileUploadProps) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noDrag: disableDrop,
    multiple: true,
    maxSize: UPLOAD_SIZE_LIMIT_PDF,
  });
  const {
    handleCloseFileListModal,
    isFileListModalOpen,
    handleOpenFileListModal,
    handleSubmitFileSelection
  } = useFileUploadEffects(
      handleSubmitSelection,
      handleFileListChanged,
      selectOnUploaded,
      mutateUpload,
      acceptedFiles
    );

  return (
    <div>
      <Grid container flexGrow={1} alignItems="center">
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
              handleCancel={handleCloseFileListModal}
              handleSubmitSelection={handleSubmitFileSelection}
              open={isFileListModalOpen}
            />
            {withFileList && (
              <CallToActionButton
                translateKey='forms.chooseFromUploadedDocs'
                onClick={handleOpenFileListModal}
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
