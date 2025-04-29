'use client';

import { SearchBar } from '@/shared/ui/client';
import { FiltersBtn } from '@/shared/ui/client';
import { useTranslations } from 'next-intl';

export const SearchSection = () => {
  const t = useTranslations('RecipesPage');
  return (
    <section className='flex flex-col sm:flex-row sm:items-center gap-5 justify-between'>
      <SearchBar className='border-1 border-gray-300'>{t('SearchBar')}</SearchBar>
      <FiltersBtn />
    </section>
  );
};
