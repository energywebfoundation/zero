import { useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection } from 'react-dropzone';
import {
  useFilesControllerUploadFiles,
} from '@energyweb/zero-api-client';
import { useImmer } from 'use-immer';
import { UploadFile } from '../../file';

export const useImageUploadContainerEffects = (
  handleUploadSuccess: (fileList: string[]) => void,
) => {
  const [imageList, setImageList] = useImmer<Array<string>>([]);
  const [previewList, setPreviewList] = useState<Array<string>>([]);

  const { mutateAsync, isLoading } = useFilesControllerUploadFiles();
  const submitHandler = ({ file }: UploadFile) =>
    mutateAsync({
      data: { file },
    });

  useEffect(() => {
    if (imageList) handleUploadSuccess(imageList);
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
            const { id } = res;
            setPreviewList([]);
            setImageList((draft) => [...draft, id]);
          })
      });
    },
    []
  );

  // Clean up
  useEffect(() => () => {
    previewList.forEach((value) => URL.revokeObjectURL(value));
  });

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
