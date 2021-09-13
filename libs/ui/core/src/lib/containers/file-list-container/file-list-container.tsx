import styled from '@emotion/styled';
import FileList from '../../components/file-list/file-list';
import { useFileListContainerEffects } from './file-list-container.effects';
import GenericModal from '../../components/generic-modal/generic-modal';
import { useCallback, useState } from 'react';
import xor from 'lodash/fp/xor';

/* eslint-disable-next-line */
export interface FileListContainerProps {
  resetAfterSubmit?: boolean;
  open: boolean;
  multiple?: boolean;
  handleCancel: () => void;
  handleSubmitSelection: (fileIdList: string[]) => void;
}

const StyledFileListContainer = styled.div``;

export const FileListContainer = ({
  open,
  multiple,
  handleCancel,
  handleSubmitSelection,
  resetAfterSubmit,
}: FileListContainerProps) => {
  const {
    userFileList: { isFetched, data = [] },
  } = useFileListContainerEffects();
  const [selectedFileIdList, setSelectedFileIdList] = useState<string[]>([]);
  return (
    <GenericModal
      title={'Files uploaded by you'}
      open={open}
      handleClose={handleCancel}
    >
      <StyledFileListContainer>
        <FileList
          handleSubmit={(fileIdList) => {
            handleSubmitSelection(fileIdList);
            if (resetAfterSubmit) {
              setSelectedFileIdList([]);
            }
          }}
          handleCancel={handleCancel}
          loading={!isFetched}
          handleSelectionChange={useCallback(
            (id) => {
              setSelectedFileIdList(
                multiple ? xor(selectedFileIdList, [id]) : [id]
              );
            },
            [selectedFileIdList]
          )}
          selectedFileIdList={selectedFileIdList}
          fileList={data}
        />
      </StyledFileListContainer>
    </GenericModal>
  );
};

export default FileListContainer;
