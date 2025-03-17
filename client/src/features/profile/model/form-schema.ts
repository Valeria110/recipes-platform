import { oneLowercaseLetter, oneNumber, oneSpecialChar, oneUppercaseLetter } from '@/shared/model';
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('Invalid e-mail'),
  oldPassword: yup.string().test('password-strength', 'Password must meet all requirements', function (value) {
    if (!value) return true;

    const errors = [];
    if (value.length < 8) errors.push('Password must be at least 8 characters long');
    if (!oneSpecialChar.test(value)) errors.push('Must contain at least one special character');
    if (!oneNumber.test(value)) errors.push('Must contain at least one number');
    if (!oneUppercaseLetter.test(value)) errors.push('Must contain at least one uppercase letter');
    if (!oneLowercaseLetter.test(value)) errors.push('Must contain at least one lowercase letter');

    return errors.length === 0 || this.createError({ message: errors[0] });
  }),
  newPassword: yup.string().test('password-strength', 'Password must meet all requirements', function (value) {
    if (!value) return true;

    const errors = [];
    if (value.length < 8) errors.push('Password must be at least 8 characters long');
    if (!oneSpecialChar.test(value)) errors.push('Must contain at least one special character');
    if (!oneNumber.test(value)) errors.push('Must contain at least one number');
    if (!oneUppercaseLetter.test(value)) errors.push('Must contain at least one uppercase letter');
    if (!oneLowercaseLetter.test(value)) errors.push('Must contain at least one lowercase letter');

    return errors.length === 0 || this.createError({ message: errors[0] });
  }),
});
