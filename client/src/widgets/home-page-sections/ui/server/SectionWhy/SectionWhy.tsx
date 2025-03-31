import { WhyCard } from './WhyCard';
import { LuCookingPot } from 'react-icons/lu';
import { BsCookie } from 'react-icons/bs';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { GiCookingGlove } from 'react-icons/gi';

export const SectionWhy = () => {
  return (
    <section
      className='flex flex-col
    gap-8 w-full mb-10 mt-10'
    >
      <h3 className='text-4xl font-medium'>Why you&apos;ll love it?</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-10 justify-items-center'>
        <WhyCard title='Share your recipes' description='Post your recipes to share them with others'>
          <LuCookingPot size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard
          title='Search for recipes'
          description='Search for recipes by categories, cuisine types and recipe names'
        >
          <MdOutlineScreenSearchDesktop size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard title='Save favorite recipes' description='Add recipes you liked to your favs'>
          <BsCookie size={80} className='text-orange-400' />
        </WhyCard>
        <WhyCard
          title='Learn new cuisines'
          description='Try cooking other cuisines and explore this interesting culinary world'
        >
          <GiCookingGlove size={80} className='text-orange-400' />
        </WhyCard>
      </div>
    </section>
  );
};
