import { Box, Button, CircularProgress } from "@material-ui/core";
import { Check, Clear, PictureAsPdfOutlined } from "@material-ui/icons";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { FileTypeEnum, UPLOAD_SIZE_LIMIT_PDF } from "../../../file";
import { CallToActionButton } from "../../../layout";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import { StyledFileName, useStyles } from "./FieldSelectAndFileUpload.styles";

interface FieldSelectAndFileUploadProps {
  id: number;
  fileId: string;
  fileName: string;
  fileType: FileTypeEnum | undefined;
  acceptedTypes: FileTypeEnum[];
  handleFileUpload: (id: number, file: File) => Promise<void>;
  handleFileRemove: (id: number) => void;
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
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {fileId && fileName && fileType ?
          (<Box display="flex" ml={3}>
            <Check color="secondary" />
            <StyledFileName color="primary">
              {fileName}
            </StyledFileName>
          </Box>)
          :(
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
          </div>)
          }

          <Button
            className={classes.removeBtn}
            variant="contained"
            onClick={() => setRemoveModalOpen(true)}
          >
            <Clear fontSize="small" color="error" />
          </Button>
          <ConfirmDeleteModal
            open={removeModalOpen}
            handleClose={() => setRemoveModalOpen(false)}
            handleDelete={() => handleFileRemove(id)}
            fileName={fileName}
          />
        </Box>
  )
}
