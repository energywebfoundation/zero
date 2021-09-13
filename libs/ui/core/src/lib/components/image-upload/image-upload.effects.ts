import {
  UploadFileDto,
  useFilesControllerUploadFiles,
} from '@energyweb/zero-ui-api';

export const useImageUploadEffects = () => {
  const { mutateAsync } = useFilesControllerUploadFiles();
  return {
    submitHandler: ({ file }: UploadFileDto) =>
      mutateAsync({
        data: { file },
      }),
  };
};
