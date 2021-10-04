import { useCallback, useState } from 'react';
import xor from 'lodash/fp/xor';
import { useFileListContainerEffects } from './FileListContainer.effects';
import { GenericModal, FileList } from '@energyweb/zero-ui-core';

export interface FileListContainerProps {
  resetAfterSubmit?: boolean;
  open: boolean;
  multiple?: boolean;
  handleCancel: () => void;
  handleSubmitSelection: (fileIdList: string[]) => void;
}

export const FileListContainer = ({
  open,
  multiple,
  handleCancel,
  handleSubmitSelection,
  resetAfterSubmit,
}: FileListContainerProps) => {
  const {
    userFileList: { isFetched, data = [] },
    handleDeleteRequest,
    isProcessing,
  } = useFileListContainerEffects();
  const [selectedFileIdList, setSelectedFileIdList] = useState<string[]>([]);
  return (
    <GenericModal
      title={'Files uploaded by you'}
      open={open}
      handleOnClose={handleCancel}
    >
        <FileList
          selectable
          handleSubmit={(fileIdList) => {
            handleSubmitSelection(fileIdList);
            if (resetAfterSubmit) {
              setSelectedFileIdList([]);
            }
          }}
          handleCancel={handleCancel}
          loading={!isFetched || isProcessing}
          handleSelectionChange={useCallback(
            (id) => {
              setSelectedFileIdList(
                multiple ? xor(selectedFileIdList, [id]) : [id]
              );
            },
            [selectedFileIdList]
          )}
          selectedFileIdList={selectedFileIdList}
          handleDeleteRequest={handleDeleteRequest}
          fileList={data}
        />
    </GenericModal>
  );
};
