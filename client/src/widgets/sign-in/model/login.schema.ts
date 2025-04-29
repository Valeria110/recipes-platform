import { setYupLocale } from '@/shared/config';
import { oneLowercaseLetter, oneNumber, oneSpecialChar, oneUppercaseLetter } from '@/shared/model';
import { object, string } from 'yup';

export const getLoginSchema = (locale: string) => {
  setYupLocale(locale);

  return object({
    email: string().email().required(),
    password: string()
      .min(8)
      .matches(oneSpecialChar, 'Must contain at least one speacial character')
      .matches(oneNumber, 'Must contain at least one number')
      .matches(oneUppercaseLetter, 'Must contain at least one uppercased letter')
      .matches(oneLowercaseLetter, 'Must contain at least one lowercased letter')
      .required(),
  });
};
