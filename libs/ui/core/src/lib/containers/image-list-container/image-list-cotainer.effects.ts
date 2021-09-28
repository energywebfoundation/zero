import { useSelector } from 'react-redux';
import { userFileListStateSelectors } from '@energy-web-zero/store-configure';

export const useImageListContainerEffects = () => {
  const userFileList = useSelector(userFileListStateSelectors.list);
  return { selectors: { userFileList } };
};
