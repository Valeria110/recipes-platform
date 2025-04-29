'use client';

import { addCategory, addCuisineType, removeCategory, removeCuisineType } from '@/features/user/search.slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { FilterType } from '@/shared/types';
import { memo, useEffect, useState } from 'react';

interface ICheckboxProps {
  label: string;
  filterName?: FilterType;
  filterKey: string;
}

export const Checkbox = memo(({ label, filterName, filterKey }: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { categories, cuisineTypes } = useAppSelector((state) => state.search.filters);

  useEffect(() => {
    if (categories.includes(filterKey) || cuisineTypes.includes(filterKey)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [categories, cuisineTypes, filterKey]);

  const handleChange = () => {
    setIsChecked(!isChecked);

    if (filterName === FilterType.CATEGORY) {
      if (!isChecked) {
        dispatch(addCategory(filterKey));
      } else {
        dispatch(removeCategory(filterKey));
      }
    }

    if (filterName === FilterType.CUISINE) {
      if (!isChecked) {
        dispatch(addCuisineType(filterKey));
      } else {
        dispatch(removeCuisineType(filterKey));
      }
    }
  };

  return (
    <label className='flex items-center hoverable:hover:cursor-pointer hoverable:hover:text-orange-400 transition-colors duration-200 ease-in-out'>
      <input
        className='relative peer mr-2 appearance-none w-4 h-4 bg-white border-1 border-gray-400 rounded-md shrink-0 checked:bg-orange-400 checked:border-0 hoverable:hover:cursor-pointer focus:outline-none focus:ring-offset-0'
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        value={filterKey}
      />
      {label}
      <svg
        className='absolute left-5 w-2 h-2 hidden peer-checked:block pointer-events-none'
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
