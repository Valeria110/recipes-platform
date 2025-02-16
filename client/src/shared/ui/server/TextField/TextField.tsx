import { JSX, memo } from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

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
  ...props
}: ITextFieldProps<T>) => {
  return (
    <label className={`flex flex-col gap-2 ${width}`}>
      {label}
      <input
        type='text'
        {...register(registerName)}
        className={`p-3 border-gray-400 border-1 rounded-3xl text-sm sm:text-md text-start focus-within:outline-none w-full ${height}`}
        {...props}
      />
      {error?.message && <p className='text-red-500 text-sm'>{error.message}</p>}
    </label>
  );
};

export const TextField = memo(TextFieldComponent) as <T extends FieldValues>(props: ITextFieldProps<T>) => JSX.Element;
