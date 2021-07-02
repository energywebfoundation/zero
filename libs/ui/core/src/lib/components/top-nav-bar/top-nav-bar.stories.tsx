import React from 'react';
import { TopNavBar, TopNavBarProps } from './top-nav-bar';
import { AppLanguageEnum } from '../language-select/language-select';

export default {
  component: TopNavBar,
  title: 'TopNavBar',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: TopNavBarProps = {
    handleLanguageChange(language: AppLanguageEnum): void {
      return;
    },
    handleNavigate(url: string): void {
      return;
    },
    secondaryNavigationItemList: [],
    primaryNavigationItemList: [],
  };

  return <TopNavBar {...props} />;
};
