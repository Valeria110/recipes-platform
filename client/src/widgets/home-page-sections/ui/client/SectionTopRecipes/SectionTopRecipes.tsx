'use client';

import { RecipeCard } from '@/features/recipe-card/ui/RecipeCard/RecipeCard';
import { StoreProvider } from '@/shared/ui/client/StoreProvider/StoreProvider';
import { Button } from '@/shared/ui/server';

export const SectionTopRecipes = () => {
  return (
    <StoreProvider>
      <section className='flex flex-col gap-5 items-center lg:items-start w-full mt-10 mb-10'>
        <div className='w-full flex flex-col lg:flex-row gap-6 justify-between'>
          <h2 className='text-4xl font-medium'>Top Recipes</h2>
          <Button width='w-32'>Explore all</Button>
        </div>
        <div className='w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center items-center  sm:items-start sm:justify-start'>
          <RecipeCard
            imageUrl={null}
            title={'Recipe name'}
            authorId={null}
            ingredients={['']}
            servingNum={4}
            cookingTime={0}
            instructions={''}
            recipeId={'1'}
            createdAt={''}
            updatedAt={''}
          ></RecipeCard>
          <RecipeCard
            imageUrl={null}
            title={'Recipe name'}
            authorId={null}
            ingredients={['']}
            servingNum={4}
            cookingTime={0}
            instructions={''}
            recipeId={'2'}
            createdAt={''}
            updatedAt={''}
          ></RecipeCard>
          <RecipeCard
            imageUrl={null}
            title={'Recipe name'}
            authorId={null}
            ingredients={['']}
            servingNum={4}
            cookingTime={0}
            instructions={''}
            recipeId={'3'}
            createdAt={''}
            updatedAt={''}
          ></RecipeCard>
          <RecipeCard
            imageUrl={null}
            title={'Recipe name'}
            authorId={null}
            ingredients={['']}
            servingNum={4}
            cookingTime={0}
            instructions={''}
            recipeId={'4'}
            createdAt={''}
            updatedAt={''}
          ></RecipeCard>
        </div>
      </section>
    </StoreProvider>
  );
};
