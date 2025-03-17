import { oneLowercaseLetter, oneNumber, oneSpecialChar, oneUppercaseLetter } from '@/shared/model';
import { object, string } from 'yup';

export const schema = object({
  email: string().email('Invalid e-mail').required('This field is required'),
  password: string()
    .min(8)
    .matches(oneSpecialChar, 'Must contain at least one speacial character')
    .matches(oneNumber, 'Must contain at least one number')
    .matches(oneUppercaseLetter, 'Must contain at least one uppercased letter')
    .matches(oneLowercaseLetter, 'Must contain at least one lowercased letter')
    .required('This field is required'),
});
