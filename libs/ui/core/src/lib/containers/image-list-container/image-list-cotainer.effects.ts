import { useSelector } from 'react-redux';
import { userFileListStateSelectors } from '@energyweb/zero-ui-store';

export const useImageListContainerEffects = () => {
  const userFileList = useSelector(userFileListStateSelectors.list);
  return { selectors: { userFileList } };
};
