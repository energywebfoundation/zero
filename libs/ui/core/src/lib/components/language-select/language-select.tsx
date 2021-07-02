import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useStyles } from './language-select.style';
import { useEffect, useState } from 'react';
import map from 'lodash/fp/map';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
export enum AppLanguageEnum {
  English = 'en',
  German = 'de',
  Spanish = 'es',
  Turkish = 'tr',
  Vietnamese = 'vi',
}

/* eslint-disable-next-line */
export interface LanguageSelectProps {
  handleLanguageChange: (language: AppLanguageEnum) => void;
}

export const LanguageSelect = (props: LanguageSelectProps) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [language, setLanguage] = useState<AppLanguageEnum>(
    AppLanguageEnum.English
  );

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return (
    <FormControl variant={'standard'} color={'primary'}>
      <Select
        disableUnderline={true}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={styles.root}
      >
        {map(
          (value) => (
            <MenuItem key={value} value={value}>
              {t(`components.LanguageSelect.${value}`)}
            </MenuItem>
          ),
          AppLanguageEnum
        )}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
