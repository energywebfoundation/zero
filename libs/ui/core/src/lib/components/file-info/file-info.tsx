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
import { FileMetadataDto } from '@energy-web-zero/api-client';
import { useTranslation } from 'react-i18next';

export enum FileTypeEnum {
  PDF = 'application/pdf',
  JPEG = 'image/jpeg',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS = 'application/vnd.ms-excel',
  XLT = 'application/vnd.ms-excel',
  XLA = 'application/vnd.ms-excel',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PNG = 'image/png',
  XML = 'text/xml',
  PPT = 'application/vnd.ms-powerpoint',
}
/* eslint-disable-next-line */
export interface FileInfoProps {
  id: string;
  handleDeleteRequest?: (filename: string) => void;
  selected?: boolean;
}

export const FileInfo = ({ id, handleDeleteRequest }: FileInfoProps) => {
  const fileMetadata: FileMetadataDto | undefined = useSelector((state) =>
    userFileListStateSelectors.getFileMetadataById(state as RootState, id)
  );
  const { t } = useTranslation();
  return (
    <Box display={'flex'} alignItems={'center'}>
      {fileMetadata ? (
        <Box display={'flex'}>
          <Box mr={2}>
            {renderFileTypeIcon(fileMetadata.mimetype as FileTypeEnum)}
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
            {t('components.FileInfo.loading')}
          </Typography>
        </Box>
      )}
      {handleDeleteRequest && (
        <IconButton onClick={() => handleDeleteRequest(id)}>
          <DeleteForeverOutlined />
        </IconButton>
      )}
    </Box>
  );
};

const renderFileTypeIcon = (mime: FileTypeEnum) => {
  if (mime === FileTypeEnum.PDF)
    return <PictureAsPdfOutlined color={'secondary'} />;
  if (
    [
      FileTypeEnum.DOC,
      FileTypeEnum.XML,
      FileTypeEnum.DOCX,
      FileTypeEnum.XLA,
      FileTypeEnum.XLT,
      FileTypeEnum.XLS,
      FileTypeEnum.PPT,
      FileTypeEnum.XLSX,
    ].includes(mime)
  )
    return <DocumentScannerOutlined color={'secondary'} />;
  if ([FileTypeEnum.JPEG, FileTypeEnum.PNG].includes(mime))
    return <Image color={'secondary'} />;
  else return null;
};

export default FileInfo;
