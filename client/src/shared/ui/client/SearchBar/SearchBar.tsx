'use client';

import { Button } from '@/shared/ui/server/Button/Button';
import { setSearchValue } from '@/features/user/search.slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store.hooks';
import { useDeboubce } from '@/shared/hooks/useDebounce';
import { Route } from '@/shared/types/routes';
import { usePathname, useRouter } from 'next/navigation';
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';

interface ISearchBar {
  children: string;
  className?: string;
}

export const SearchBar = ({ children, className }: ISearchBar) => {
  const { searchValue } = useAppSelector((state) => state.search);
  const [inputValue, setInputValue] = useState(searchValue);
  const debouncedValue = useDeboubce(inputValue);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setSearchValue(debouncedValue));
  }, [debouncedValue]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearchBtnClick = () => {
    if (pathname === Route.HOME) {
      dispatch(setSearchValue(inputValue));
      router.push(Route.RECIPES);
    }
  };
  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (pathname === Route.HOME) {
      dispatch(setSearchValue(inputValue));
      router.push(Route.RECIPES);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`flex justify-between gap-3 bg-white rounded-full p-2 w-fit ${className}`}
    >
      <input
        onChange={handleInputChange}
        className='rounded-3xl p-2 focus:outline-0 w-48 md:w-72'
        type='search'
        placeholder={children}
        value={inputValue}
      />
      <Button onClick={handleSearchBtnClick} width='w-24 w-28'>
        Search
      </Button>
    </form>
  );
};
