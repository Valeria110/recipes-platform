import { RecipeForm } from '@/features/recipe-form/ui';

export const ShareRecipePage = () => {
  return (
    <div className='p-5 sm:p-10 flex flex-col gap-10'>
      <header className='flex flex-col items-center gap-5'>
        <h2 className='text-3xl font-semibold'>Share your recipe</h2>
        <p className='text-gray-500 text-center'>
          Let your culinary creations shine! Share your delicious recipes with our audience by filling out the form
          below. Your expertise can inspire and delight others in our flavorful community.
        </p>
      </header>

      <main>
        <RecipeForm />
      </main>
    </div>
  );
};
