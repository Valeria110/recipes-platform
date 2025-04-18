import { WhyCard } from './WhyCard';
import { LuCookingPot } from 'react-icons/lu';
import { BsCookie } from 'react-icons/bs';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { GiCookingGlove } from 'react-icons/gi';
import { getTranslations } from 'next-intl/server';

export const SectionWhy = async () => {
  const t = await getTranslations('HomePage.SectionWhy');
  return (
    <section
      className='flex flex-col
    gap-8 w-full mb-10 mt-10'
    >
      <h3 className='text-4xl font-medium'>{t('Header')}</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-10 justify-items-center'>
        <WhyCard title={t('ShareRecipe.title')} description={t('ShareRecipe.description')}>
          <LuCookingPot size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard title={t('SearchRecipes.title')} description={t('SearchRecipes.description')}>
          <MdOutlineScreenSearchDesktop size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard title={t('SaveFavRecipes.title')} description={t('SaveFavRecipes.description')}>
          <BsCookie size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard title={t('LearnCuisines.title')} description={t('LearnCuisines.description')}>
          <GiCookingGlove size={80} className='text-orange-400' />
        </WhyCard>
      </div>
    </section>
  );
};
