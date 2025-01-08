import { UseFormRegister, FieldErrors, UseFormWatch, FieldValues, Path } from 'react-hook-form';

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch?: UseFormWatch<T>;
  handleInput: () => void;
}

export const FormInput = <T extends FieldValues>({
  label,
  type = 'text',
  register,
  errors,
  name,
  handleInput,
}: IFormInput<T>) => {
  return (
    <label className='flex flex-col gap-2 text-md'>
      {label}
      <input
        className='w-full border-gray-300 focus:outline-none border-2 text-black rounded-3xl p-2'
        type={type}
        {...register(name)}
        onInput={handleInput}
      />
      {errors[name] && <p className='text-red-500'>{`${errors[name].message}`}</p>}
    </label>
  );
};
