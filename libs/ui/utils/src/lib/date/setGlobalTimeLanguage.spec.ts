// import { setGlobalTimeLanguage } from './setGlobalTimeLanguage';
// import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { setGlobalTimeLanguage } from './setGlobalTimeLanguage';
import { AppLanguageEnum } from '@energyweb/zero-ui';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

describe('setGlobalTimeLanguage', function () {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  it('should set global date locale to English', function () {
    setGlobalTimeLanguage(AppLanguageEnum.English);
    expect(
      dayjs(new Date(1900, 1, 23, 11, 11).toDateString()).format()
    ).toMatchInlineSnapshot(`"1900-02-23T00:00:00+01:30"`);
  });
});
