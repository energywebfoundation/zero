import styled from '@emotion/styled';
import { Image, PictureAsPdfOutlined } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';

export enum FileTypeEnum {
  PDF = 'PDF',
  JPG = 'JPG',
  DOC = 'DOC',
  PNG = 'PNG',
  XML = 'XML',
}
/* eslint-disable-next-line */
export interface FileInfoProps {
  fileType: FileTypeEnum;
  filename: string;
}

const StyledFileInfo = styled(Box)``;

export const FileInfo = ({ fileType, filename }: FileInfoProps) => (
  <StyledFileInfo display={'flex'} alignContent={'center'}>
    <Box mr={2}>{renderFileTypeIcon(fileType)}</Box>
    <Typography fontWeight={600} fontSize={'18px'} color={'primary'}>
      {filename}
    </Typography>
  </StyledFileInfo>
);

export const renderFileTypeIcon = (fileType: FileTypeEnum) => {
  switch (fileType) {
    case FileTypeEnum.PDF:
      return <PictureAsPdfOutlined color={'primary'} />;
    case FileTypeEnum.DOC:
    case FileTypeEnum.XML:
      return;
    case FileTypeEnum.JPG:
    case FileTypeEnum.PNG:
      return <Image />;
  }
};

export default FileInfo;
