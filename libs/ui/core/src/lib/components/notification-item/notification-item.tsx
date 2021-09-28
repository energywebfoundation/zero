import { Box, Container, IconButton, Typography } from '@material-ui/core';
import { NotificationConfig, NotificationType } from '@energyweb/zero-ui-store';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface NotificationItemProps {
  data: NotificationConfig;
  handleDismiss: (notificationId: string) => void;
}

export const NotificationItem = ({
  handleDismiss,
  data: { text, id, type },
}: NotificationItemProps) => {
  const { t } = useTranslation();
  return (
    <Box
      height={'70px'}
      bgcolor={getBgColor(type)}
      display={'flex'}
      alignItems={'center'}
      mb={1}
    >
      <Container fixed>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box flexGrow={1}>
            <Typography
              textAlign={'center'}
              component={'div'}
              color={'#fff'}
              fontSize={'20px'}
              fontWeight={700}
              lineHeight={'24px'}
            >
              <div>{t(text.firstLine)}</div>
              {text.secondLine && <div>{t(text.secondLine)}</div>}
            </Typography>
          </Box>
          <IconButton>
            <Close
              sx={{ fontSize: '16px', cursor: 'pointer', color: '#fff' }}
              onClick={() => handleDismiss(id)}
            />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

const getBgColor = (type: NotificationType) => {
  return {
    [NotificationType.Error]: 'error.main',
    [NotificationType.Warning]: 'warning.main',
    [NotificationType.Success]: 'success.main',
    [NotificationType.Info]: 'info.main',
  }[String(type)];
};

export default NotificationItem;
