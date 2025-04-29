'use client';

import Image from 'next/image';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { downArrow, searchSvg, upArrow } from '@/shared/assets';
import { useState } from 'react';
import { Option } from '@/shared/ui/client';
import { FilterOptionType } from '@/shared/types';
import { useLocale } from 'next-intl';

interface ISelectProps<T extends FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
  registerName: Path<T>;
  options: string[] | FilterOptionType[];
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
  const locale = useLocale() as 'ru' | 'en';

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
                className={`relative flex gap-2 p-2 border-1 bg-white border-gray-400 rounded-full text-sm sm:text-base hoverable:hover:cursor-pointer ${width}`}
                onClick={toggleOptions}
              >
                <Image src={searchSvg} alt='search svg image' width={25} />
                <input
                  className='w-fit focus:outline-none hover:cursor-pointer text-sm bg-transparent placeholder:text-sm '
                  placeholder={props['aria-placeholder']}
                  type='text'
                  readOnly
                  value={isMultiSelect ? '' : value}
                />
                <Image
                  className='absolute right-2 flex ml-auto'
                  src={isOpen ? upArrow : downArrow}
                  alt='down arrow svg'
                />
              </div>
              {isOpen && (
                <div className='flex flex-col mt-3 text-base'>
                  {options.map((option, i) => {
                    const key = typeof option === 'string' ? option : option.key;

                    return (
                      <Option
                        handleSelect={() => handleSelect(key)}
                        key={i}
                        option={typeof option === 'string' ? option : option[locale]}
                        optionKey={key}
                        isSelected={Array.isArray(value) ? value.includes(key) : false}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>
        );
      }}
    ></Controller>
  );
};
