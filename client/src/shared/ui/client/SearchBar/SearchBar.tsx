'use client';

import { Button } from '@/shared/ui/server/Button/Button';
import { setSearchValue } from '@/features/user/search.slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store.hooks';
import { useDeboubce } from '@/shared/hooks/useDebounce';
import { Route } from '@/shared/types/routes';
import { usePathname, useRouter } from 'next/navigation';
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

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
    dispatch(setSearchValue(debouncedValue.toLowerCase()));
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
      className={`flex justify-between gap-2 bg-white rounded-full p-2 w-fit ${className ? className : ''}`}
    >
      <input
        onChange={handleInputChange}
        className='rounded-3xl p-2 focus:outline-0 min-w-fit w-48 md:w-72'
        type='search'
        placeholder={children}
        value={inputValue}
      />
      <Button onClick={handleSearchBtnClick} width='w-12 sm:w-24'>
        <span className='hidden sm:inline'>Search</span>
        <IoSearch size={25} className='text-white sm:hidden' />
      </Button>
    </form>
  );
};
