'use client';

import { memo, useState } from 'react';

interface IOptionProps {
  option: string;
  isSelected: boolean;
  handleSelect: (option: string) => void;
}

export const Option = memo(({ option, isSelected, handleSelect }: IOptionProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isSelected);
  const handleChange = () => {
    setIsChecked(!isChecked);
    handleSelect(option);
  };

  return (
    <label
      className={`relative flex items-center p-2 ${isChecked ? 'bg-orange-300/35' : 'bg-white'} hoverable:hover:cursor-pointer ${!isChecked && 'hoverable:hover:bg-orange-300/35'} transition-colors duration-200 ease-in-out`}
    >
      <input
        className='relative peer mr-2 appearance-none w-4 h-4 bg-white border-1 border-gray-400 rounded-md shrink-0 checked:bg-orange-400 checked:border-0 hoverable:hover:cursor-pointer focus:outline-none focus:ring-offset-0'
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        value={option}
      ></input>
      {option}
      <svg
        className='absolute left-3 w-2 h-2 hidden peer-checked:block pointer-events-none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='white'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='20 6 9 17 4 12'></polyline>
      </svg>
    </label>
  );
});
