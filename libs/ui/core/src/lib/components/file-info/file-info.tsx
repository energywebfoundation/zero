import styled from '@emotion/styled';
import {
  DeleteForeverOutlined,
  DocumentScannerOutlined,
  Image,
  PictureAsPdfOutlined,
} from '@material-ui/icons';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  RootState,
  userFileListStateSelectors,
} from '@energy-web-zero/store-configure';
import { FileMetadataDto } from '@energyweb/zero-ui-api';

export enum FileTypeEnum {
  PDF = 'PDF',
  JPG = 'JPG',
  DOC = 'DOC',
  PNG = 'PNG',
  XML = 'XML',
}
/* eslint-disable-next-line */
export interface FileInfoProps {
  id: string;
  handleDeleteRequest?: (filename: string) => void;
  selected?: boolean;
}

const StyledFileInfo = styled(Box)``;

export const FileInfo = ({ id, handleDeleteRequest }: FileInfoProps) => {
  console.log(id);
  const fileMetadata: FileMetadataDto | undefined = useSelector((state) =>
    userFileListStateSelectors.getFileMetadataById(state as RootState, id)
  );
  return (
    <StyledFileInfo display={'flex'} alignItems={'center'}>
      {fileMetadata ? (
        <Box display={'flex'}>
          <Box mr={2}>
            {renderFileTypeIcon(getFileTypeFromMime(fileMetadata.mimetype))}
          </Box>
          <Typography
            sx={{ textDecoration: 'underline' }}
            component={'div'}
            fontWeight={600}
            fontSize={'16px'}
            color={'primary'}
          >
            {fileMetadata?.filename}
          </Typography>
        </Box>
      ) : (
        <Box display={'flex'} alignItems={'center'}>
          <CircularProgress
            sx={{ mr: '17px', ml: '3px' }}
            size={'18px'}
            color={'secondary'}
          />
          <Typography
            component={'div'}
            fontWeight={600}
            fontSize={'16px'}
            color={'primary'}
          >
            Loading...
          </Typography>
        </Box>
      )}
      {handleDeleteRequest && (
        <IconButton onClick={() => handleDeleteRequest(id)}>
          <DeleteForeverOutlined />
        </IconButton>
      )}
    </StyledFileInfo>
  );
};

const renderFileTypeIcon = (fileType: FileTypeEnum) => {
  switch (fileType) {
    case FileTypeEnum.PDF:
      return <PictureAsPdfOutlined color={'secondary'} />;
    case FileTypeEnum.DOC:
    case FileTypeEnum.XML:
      return <DocumentScannerOutlined color={'secondary'} />;
    case FileTypeEnum.JPG:
    case FileTypeEnum.PNG:
      return <Image color={'secondary'} />;
  }
};

const getFileTypeFromMime = (mimeType: string): FileTypeEnum => {
  return FileTypeEnum.JPG;
};

export default FileInfo;
