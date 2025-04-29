import { RecipeForm } from '@/features/recipe-form/ui';
import { getTranslations } from 'next-intl/server';

export const ShareRecipePage = async () => {
  const t = await getTranslations('ShareRecipePage');
  return (
    <div className='p-5 sm:p-10 flex flex-col gap-10'>
      <header className='flex flex-col items-center gap-5'>
        <h2 className='text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-gray-500 text-center'>{t('subtitle')}</p>
      </header>

      <main>
        <RecipeForm />
      </main>
    </div>
  );
};
