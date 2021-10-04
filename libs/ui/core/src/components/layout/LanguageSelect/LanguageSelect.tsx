import { FormControl, MenuItem, Select } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import map from 'lodash/fp/map';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useStyles } from './LanguageSelect.styles';

export enum AppLanguageEnum {
  English = 'en',
  German = 'de',
  Spanish = 'es',
  Turkish = 'tr',
  Vietnamese = 'vi',
}

export interface LanguageSelectProps {
  handleLanguageChange: (language: AppLanguageEnum) => void;
}

export const LanguageSelect: FC<LanguageSelectProps> = () => {
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
        onChange={(e) => setLanguage(e.target.value as AppLanguageEnum)}
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
