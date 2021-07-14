import React from 'react';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { SignInOptions } from './sign-in-options';

export default {
  title: 'Form / SignInOptions',
  component: SignInOptions,
} as Meta;

export const Default = () => {
  const [remember, setRemember] = useState(false);
  return (
    <SignInOptions
      remember={remember}
      setRemember={setRemember}
      forgotPassUrl="/forgot-password"
    />
  );
};
