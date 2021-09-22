import { Box, Container, IconButton, Typography } from '@material-ui/core';
import {
  NotificationConfig,
  NotificationType,
} from '@energy-web-zero/store-configure';
import { Close } from '@material-ui/icons';

/* eslint-disable-next-line */
export interface NotificationItemProps {
  data: NotificationConfig;
  handleDismiss: (notificationId: string) => void;
}

export const NotificationItem = ({
  handleDismiss,
  data: { text, id, type },
}: NotificationItemProps) => (
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
            <div>{text.firstLine}</div>
            {text.firstLine && <div>{text.secondLine}</div>}
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

const getBgColor = (type: NotificationType) => {
  return {
    [NotificationType.Error]: 'error.main',
    [NotificationType.Warning]: 'warning.main',
    [NotificationType.Success]: 'success.main',
    [NotificationType.Info]: 'info.main',
  }[String(type)];
};

export default NotificationItem;
