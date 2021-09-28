import * as yup from 'yup';
import { UserRole } from '@energyweb/zero-api-client';
import zxcvbn from 'zxcvbn';
import { ValidationError } from 'yup';

yup.addMethod(yup.string, 'passwordStrength', function (args) {
  console.log(args);
  const { message } = args;
  // eslint-disable-next-line
  return this.test('passwordStrength', message, function testFn(value):
    | boolean
    | ValidationError {
    const { createError } = this;
    return zxcvbn(value || '')?.score >= 3 || createError({ message });
  });
});

export const authSignUpFormSchema = yup.object().shape({
  firstName: yup.string().max(256).required(),
  lastName: yup.string().max(256).required(),
  email: yup.string().email().max(256).required(),
  userRole: yup.string().required().oneOf([UserRole.buyer, UserRole.seller]),
  password: yup
    .string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .passwordStrength('Password does not meet strength requirements')
    .max(2048)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf(
      [yup.ref('password'), null],
      `Password confirm does'nt match the password`
    ),
});
