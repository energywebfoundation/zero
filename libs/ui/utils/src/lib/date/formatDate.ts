import dayjs, { Dayjs } from 'dayjs';
import { DateFormatEnum } from '@energyweb/zero-ui';

export const formatDate = (
  date: Dayjs | number | string,
  includeTime = false,
  timezone?: string
) => {
  const formatToUse = includeTime
    ? DateFormatEnum.DATE_FORMAT_INCLUDING_TIME
    : DateFormatEnum.DATE_FORMAT_MDY;

  return dayjs(date)
    .tz(timezone || dayjs.tz.guess())
    .format(formatToUse);
};
