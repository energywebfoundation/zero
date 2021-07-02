import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import en from 'dayjs/locale/en';
import de from 'dayjs/locale/de';
import es from 'dayjs/locale/es';
import tr from 'dayjs/locale/tr';
import vi from 'dayjs/locale/vi';

import { AppLanguageEnum } from '@energyweb/zero-ui';

dayjs.extend(utc);
dayjs.extend(timezone);

export const setGlobalTimeLanguage = (language: AppLanguageEnum) => {
  switch (language) {
    case AppLanguageEnum.English:
      dayjs.locale({
        ...en,
        weekStart: 1,
      });
      return;

    case AppLanguageEnum.German:
      dayjs.locale({
        ...de,
        weekStart: 1,
      });
      return;

    case AppLanguageEnum.Spanish:
      dayjs.locale({
        ...es,
        weekStart: 1,
      });
      return;
    case AppLanguageEnum.Turkish:
      dayjs.locale({
        ...tr,
        weekStart: 1,
      });
      return;

    case AppLanguageEnum.Vietnamese:
      dayjs.locale({
        ...vi,
        weekStart: 1,
      });
      return;
  }
};

setGlobalTimeLanguage(AppLanguageEnum.English);
