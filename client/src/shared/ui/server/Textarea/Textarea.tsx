import { JSX, memo } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface ITextareaProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<T>;
  error?: FieldError;
  label: string;
  registerName: Path<T>;
  width?: string;
  height?: string;
}

const TextareaComponent = <T extends FieldValues>({
  register,
  error,
  label,
  registerName,
  width = 'w-full',
  height = 'h-32',
  ...props
}: ITextareaProps<T>) => {
  return (
    <label className={`flex flex-col gap-2 ${width}`}>
      {label}
      <textarea
        className={`p-3 border-1 border-gray-400 rounded-3xl focus:outline-none text-sm sm:text-md ${height}`}
        {...register(registerName)}
        placeholder={props.placeholder ?? ''}
      ></textarea>
      {error && <p className='text-red-500 text-sm'>{error.message}</p>}
    </label>
  );
};

export const Textarea = memo(TextareaComponent) as <T extends FieldValues>(props: ITextareaProps<T>) => JSX.Element;
