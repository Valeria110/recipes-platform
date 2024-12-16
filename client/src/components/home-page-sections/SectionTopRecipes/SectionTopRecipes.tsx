import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { Button } from '../../Button/Button';

export const SectionTopRecipes = () => {
  return (
    <section className='flex flex-col gap-5 items-center lg:items-start w-full mt-10 mb-10'>
      <div className='w-full flex flex-col lg:flex-row gap-6 justify-between'>
        <h2 className='text-4xl font-medium'>Top Recipes</h2>
        <Button width='w-32'>Explore all</Button>
      </div>
      <div className='w-full flex flex-col sm:flex-row sm:flex-wrap  gap-3 justify-center items-center lg:items-start lg:justify-start'>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
        <RecipeCard></RecipeCard>
      </div>
    </section>
  );
};
