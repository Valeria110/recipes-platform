import { object, string } from 'yup';

export const schema = object({
  email: string().email('Invalid e-mail').required('This field is required'),
  password: string().min(8).required('This field is required'),
});
