'use client';

import Image from 'next/image';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { downArrow, searchSvg, upArrow } from '@/shared/assets';
import { useState } from 'react';
import { Option } from '@/shared/ui/client';

interface ISelectProps<T extends FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
  registerName: Path<T>;
  options: string[];
  isMultiSelect?: boolean;
  label: string;
  width?: string;
  error?: string;
}

export const Select = <T extends FieldValues>({
  control,
  options,
  registerName,
  isMultiSelect = false,
  label,
  width = 'w-full',
  error,
  ...props
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={registerName}
      render={({ field: { onChange, value } }) => {
        const handleSelect = (option: string) => {
          if (isMultiSelect) {
            const selectedValues = value.includes(option)
              ? value.filter((item: string) => option !== item)
              : [...value, option];
            onChange(selectedValues);
          } else {
            onChange(option);
            setIsOpen(false);
          }
        };

        const toggleOptions = () => {
          setIsOpen(!isOpen);
        };

        return (
          <div className='flex flex-col gap-2 min-w-56'>
            {label}
            <div>
              <div
                className={`relative flex gap-2 p-2 border-1 bg-white border-gray-400 rounded-full hoverable:hover:cursor-pointer ${width}`}
                onClick={toggleOptions}
              >
                <Image src={searchSvg} alt='search svg image' width={25} />
                <input
                  className='w-fit focus:outline-none hover:cursor-pointer text-sm sm:text-md'
                  placeholder={props['aria-placeholder']}
                  type='text'
                  readOnly
                  value={isMultiSelect ? '' : value}
                />
                <Image
                  className='absolute right-1 flex ml-auto'
                  src={isOpen ? upArrow : downArrow}
                  alt='down arrow svg'
                />
              </div>
              {isOpen && (
                <li className='flex flex-col mt-3'>
                  {options.map((option, i) => (
                    <Option
                      handleSelect={() => handleSelect(option)}
                      key={i}
                      option={option}
                      isSelected={value.includes(option)}
                    />
                  ))}
                </li>
              )}
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>
        );
      }}
    ></Controller>
  );
};
