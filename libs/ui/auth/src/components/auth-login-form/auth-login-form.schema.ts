import * as yup from 'yup';

export const authLoginFormSchema = yup.object().shape({
  email: yup.string().email().max(100).required(),
  password: yup.string().min(6).max(2048).required(),
});