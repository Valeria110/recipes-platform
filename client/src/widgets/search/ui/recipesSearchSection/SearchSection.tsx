'use client';

import { SearchBar } from '@/shared/ui/client';
import { FiltersBtn } from '@/shared/ui/client';

export const SearchSection = () => {
  return (
    <section className='flex flex-col sm:flex-row sm:items-center gap-5 justify-between'>
      <SearchBar className='border-1 border-gray-300'>Search...</SearchBar>
      <FiltersBtn />
    </section>
  );
};
