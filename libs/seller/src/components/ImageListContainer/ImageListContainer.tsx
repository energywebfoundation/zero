import { FileMetadataDto } from '@energyweb/zero-api-client';
import { ImageList } from '@energyweb/zero-ui-core';
import { useImageListContainerEffects } from './ImageListContainer.effects';

export interface ImageListContainerProps {
  imageList: string[];
}

export const ImageListContainer = ({ imageList }: ImageListContainerProps) => {
  const { selectors } = useImageListContainerEffects();
  return (
    <ImageList
      imageList={mapFileIdToImageUrl(imageList, selectors.userFileList)}
    />
  );
};

const mapFileIdToImageUrl = (
  imageIdList: string[],
  fileMetaList: FileMetadataDto[]
) =>
  fileMetaList
    .filter((el) => imageIdList.includes(el.id))
    .map((el) => (el as any)?.url);

export default ImageListContainer;
