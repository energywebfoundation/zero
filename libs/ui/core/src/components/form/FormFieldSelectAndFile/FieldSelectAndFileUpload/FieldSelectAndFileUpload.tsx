import { Box, Button, CircularProgress } from "@material-ui/core";
import { Check, Clear, PictureAsPdfOutlined } from "@material-ui/icons";
import { FC, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { FileTypeEnum, UPLOAD_SIZE_LIMIT_PDF } from "../../../file";
import { CallToActionButton } from "../../../layout";
import { StyledFileName, useStyles } from "./FieldSelectAndFileUpload.styles";

interface FieldSelectAndFileUploadProps {
  id: number;
  fileId: string;
  fileName: string;
  fileType: FileTypeEnum | undefined;
  acceptedTypes: FileTypeEnum[];
  handleFileUpload: (id: number, file: File) => Promise<void>;
  handleFileRemove: (id: number, fileId: string) => void;
  isProcessing?: boolean;
  uploadButtonText?: string;
}

export const FieldSelectAndFileUpload: FC<FieldSelectAndFileUploadProps> = ({
  id,
  fileId,
  fileName,
  fileType,
  handleFileUpload,
  handleFileRemove,
  acceptedTypes,
  isProcessing = false,
  uploadButtonText = 'Upload'
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noDrag: true,
    multiple: false,
    maxSize: UPLOAD_SIZE_LIMIT_PDF,
    accept: acceptedTypes
  });

  useEffect(() => {
    if (acceptedFiles?.length) {
      handleFileUpload(id, acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <>
      {fileId && fileName && fileType
      ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml={3}
        >
          <Box display="flex">
            <Check color="secondary" />
            <StyledFileName color="primary">
              {fileName}
            </StyledFileName>
          </Box>
          <Button
            className={classes.removeBtn}
            variant="contained"
            onClick={() => handleFileRemove(id, fileId)}
          >
            <Clear fontSize="small" color="error" />
          </Button>
        </Box>
        )
      : (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <CallToActionButton
            sx={{ ml: 2 }}
            disabled={isProcessing}
            endIcon={
              !isProcessing ? (
                <PictureAsPdfOutlined color={'secondary'} />
              ) : (
                <CircularProgress size={'16px'} color={'secondary'} />
              )
            }
            text={
              !isProcessing
              ? t(uploadButtonText)
              : t('forms.uploadInProgress')
            }
          />
        </div>
      )
    }
    </>
  )
}
