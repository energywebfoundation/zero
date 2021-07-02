import { formatDate } from './formatDate';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

describe('time', function () {
  it('should format date with time properly', function () {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    expect(
      formatDate(new Date(1900, 1, 23, 11, 11).toString(), true)
    ).toMatchInlineSnapshot(`"Feb 23, 1900 11:11 am"`);
  });
});
