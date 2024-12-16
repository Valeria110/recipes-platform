import { SearchBar } from './SearchBar/SearchBar';

export const SearchBlock = () => {
  return (
    <section className='flex flex-col gap-6 justify-center items-center h-80 sm:h-80 bg-orange-200 px-4'>
      <h1 className='text-3xl text-center md:text-5xl font-semibold'>Discover Delicious Recipes</h1>
      <SearchBar>Search for recipes...</SearchBar>
    </section>
  );
};
