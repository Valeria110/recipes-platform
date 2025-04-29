'use client';

import { SearchBar } from '@/shared/ui/client';
import { StoreProvider } from '@/shared/ui/client/StoreProvider/StoreProvider';
import { useTranslations } from 'next-intl';

export const SearchBlock = () => {
  const t = useTranslations('SearchBlock');
  return (
    <StoreProvider>
      <section className='home-page__search-section flex flex-col gap-6 justify-center items-center h-80 sm:h-80 bg-orange-200 px-4'>
        <h1 className='text-3xl text-center md:text-5xl font-semibold'>{t('Header')}</h1>
        <SearchBar>{t('placeholder')}</SearchBar>
      </section>
    </StoreProvider>
  );
};
