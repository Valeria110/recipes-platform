import { Button } from '@/components/Button/Button';
import React from 'react';

interface ISearchBar {
  children: string;
}

export const SearchBar = ({ children }: ISearchBar) => {
  return (
    <div className='flex justify-between gap-3 bg-white rounded-full p-2 w-fit'>
      <input className='rounded-3xl p-2 focus:outline-0 w-48 md:w-72' type='search' placeholder={children} />
      <Button width='w-24 w-28'>Search</Button>
    </div>
  );
};
