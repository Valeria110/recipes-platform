import { JSX, memo, useCallback, useState } from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';
import { PasswordToggle } from '../../server';

interface ITextFieldProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  width?: string;
  height?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  error?: FieldError;
}

const TextFieldComponent = <T extends FieldValues>({
  label,
  width = 'w-56',
  height = 'auto',
  register,
  registerName,
  error,
  type = 'text',
  ...props
}: ITextFieldProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const togglePasswordField = useCallback(() => setIsPasswordVisible((prev) => !prev), []);

  return (
    <label className={`relative flex flex-col gap-2 ${width}`}>
      {label}
      <input
        type={inputType}
        {...register(registerName)}
        className={`p-3 border-gray-400 border-1 rounded-3xl text-sm sm:text-md text-start focus-within:outline-none w-full ${height}`}
        {...props}
      />
      {type === 'password' && <PasswordToggle isVisible={isPasswordVisible} onToggle={togglePasswordField} />}
      {error?.message && <p className='text-red-500 text-sm'>{error.message}</p>}
    </label>
  );
};

export const TextField = memo(TextFieldComponent) as <T extends FieldValues>(props: ITextFieldProps<T>) => JSX.Element;
