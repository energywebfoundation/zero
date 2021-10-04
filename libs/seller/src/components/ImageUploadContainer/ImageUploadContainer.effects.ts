import { useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection } from 'react-dropzone';
import {
  UploadFileDto,
  useFilesControllerUploadFiles,
} from '@energyweb/zero-api-client';
import { useImmer } from 'use-immer';

export const useImageUploadContainerEffects = (
  handleUploadSuccess: (fileList: string[]) => void,
  uploadSuccessMsg?: string,
  uploadErrorMsg?: string
) => {
  const [imageList, setImageList] = useImmer<Array<string>>([]);
  const [previewList, setPreviewList] = useState<Array<string>>([]);

  const { mutateAsync, isLoading } = useFilesControllerUploadFiles();
  const submitHandler = ({ file }: UploadFileDto) =>
    mutateAsync({
      data: { file },
    });

  useEffect(() => {
    if (imageList) {
      handleUploadSuccess(imageList);
    }
  }, [imageList]);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      acceptedFiles.forEach((file) => {
        setPreviewList([...previewList, URL.createObjectURL(file)]);
        submitHandler({ file })
          .then((res) => {
            // const { id } = res as { id: string };
            setPreviewList([]);
            // setImageList((draft) => (draft = [id]));
            // dispatch(
            //   notificationStateActions.addNotification({
            //     type: NotificationType.Success,
            //     text: {
            //       firstLine:
            //         uploadSuccessMsg ??
            //         t('components.ImageUploadContainer.uploadSuccessfullMsg'),
            //     },
            //   })
            // );
          })
          .catch(() => {
            // dispatch(
            //   notificationStateActions.addNotification({
            //     type: NotificationType.Error,
            //     text: {
            //       firstLine:
            //         uploadErrorMsg ??
            //         t('components.ImageUploadContainer.uploadErrorMsg'),
            //     },
            //   })
            // );
          });
      });
    },
    []
  );

  /**
   * Clean up
   */
  useEffect(() => () => {
    previewList.forEach((value) => URL.revokeObjectURL(value));
  });
  console.log({ isLoading });
  return {
    isProcessingUpload: isLoading,
    onDropHandler: onDrop,
    previewList,
    imageList,
    fileValidationErrorHandler: useCallback(
      (fileRejections: FileRejection[]) => {
        fileRejections.forEach((value) => {
          // dispatch(
          //   notificationStateActions.addNotification({
          //     type: NotificationType.Error,
          //     text: {
          //       firstLine: `${value.file.name} ${t(
          //         'components.FileUploadContainer.doesNotPassValidation'
          //       )}`,
          //     },
          //   })
          // );
        });
      },
      []
    ),
  };
};
