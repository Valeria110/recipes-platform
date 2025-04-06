import { JSX, memo } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface INumberFieldProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  width?: string;
  error?: FieldError;
}

const NumberFieldComponent = <T extends FieldValues>({
  label,
  register,
  registerName,
  width = 'w-fit',
  error,
  ...props
}: INumberFieldProps<T>) => {
  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      <label className='flex items-center gap-2 text-sm sm:text-md text-gray-400'>
        <input
          className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-3 w-20 border-gray-400 border-1 rounded-3xl text-center placeholder:text-gray-400 text-black text-md focus:outline-none`}
          placeholder={props.placeholder ?? ''}
          {...register(registerName)}
          type='number'
          max={props.max ?? Infinity}
          min={props.min ?? 0}
          step={props.step ?? 'any'}
          {...props}
        />
        {label}
      </label>
      {error?.message && <p className='text-red-500 text-sm'>{error.message}</p>}
    </div>
  );
};

export const NumberField = memo(NumberFieldComponent) as <T extends FieldValues>(
  props: INumberFieldProps<T>,
) => JSX.Element;
