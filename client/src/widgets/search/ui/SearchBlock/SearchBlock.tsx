'use client';

import { SearchBar } from '@/shared/ui/client';
import { StoreProvider } from '@/shared/ui/client/StoreProvider/StoreProvider';

export const SearchBlock = () => {
  return (
    <StoreProvider>
      <section className='home-page__search-section flex flex-col gap-6 justify-center items-center h-80 sm:h-80 bg-orange-200 px-4'>
        <h1 className='text-3xl text-center md:text-5xl font-semibold'>Discover Delicious Recipes</h1>
        <SearchBar>Search for recipes...</SearchBar>
      </section>
    </StoreProvider>
  );
};
