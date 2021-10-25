import { filesControllerGetFileMetadata } from "@energyweb/zero-api-client";
import { GenericFormContext } from "@energyweb/zero-ui-core";
import { useContext, useEffect, useState } from "react";

export const useImageListContainerEffects = (fieldName: string) => {
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);

  const { watch } = useContext(GenericFormContext)!;
  const imagesIdList: string[] = watch(fieldName);

  const getAndSetImagesUrls = async (imgIds: string[]) => {
    const fetchedUrls = await Promise.all(imgIds.map(async (id) => {
      const metadata = await filesControllerGetFileMetadata(id);
      return metadata.url;
    }));
    setImagesUrls(fetchedUrls);
  };

  useEffect(() => {
    if(imagesIdList.length) {
      getAndSetImagesUrls(imagesIdList);
    }
  }, [imagesIdList]);

  return { imagesUrls };
};
