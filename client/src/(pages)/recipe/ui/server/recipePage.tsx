import { usersService } from '@/shared/api';
import { IRecipe } from '@/shared/model';
import { RecipeImage, ServingNumberInfo, TimeInfo } from '@/shared/ui/client';
import DOMPurify from 'isomorphic-dompurify';
import { DateTimeFormatOptions } from 'next-intl';
import { getFormatter, getTranslations } from 'next-intl/server';

interface IRecipeData extends Omit<IRecipe, 'authorId' | 'id'> {
  authorId?: string | null;
  id?: string | null;
}

interface IProps {
  recipeData: IRecipeData;
}

export const RecipePage = async ({ recipeData }: IProps) => {
  const t = await getTranslations('RecipePage');
  const format = await getFormatter();
  const formatConfig: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const {
    title,
    description,
    imageUrl,
    authorId,
    ingredients,
    instructions,
    cookingTime,
    preparationTime,
    createdAt,
    updatedAt,
    servingNum,
  } = recipeData;

  let authorName = 'unknown author';
  if (authorId) {
    const user = await usersService.getUserById(authorId);
    authorName = user.name;
  }

  return (
    <div className='flex flex-col gap-7 p-6'>
      <h2 className='text-2xl font-semibold mx-auto md:mx-0 sm:text-3xl'>{title}</h2>
      {imageUrl && <RecipeImage url={imageUrl} />}

      <div className='flex flex-col sm:flex-row gap-6 sm:gap-12'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-semibold text-orange-400'>Preparation time </span>
          <TimeInfo time={preparationTime} />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-semibold text-orange-400'>Cooking time </span>
          <TimeInfo time={cookingTime} />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-semibold text-orange-400'>Servings </span>
          <ServingNumberInfo peopleNum={servingNum} />
        </div>
      </div>

      <div>
        <h4 className='text-lg font-semibold mb-3'>&#128204; {t('description')}:</h4>
        <p>{description}</p>
      </div>

      <div>
        <h4 className='text-lg font-semibold mb-3'>&#129361; {t('ingredients')}:</h4>
        <ul className='flex flex-col gap-2 ml-5'>
          {ingredients.map((ingredient, i) => (
            <li className='list-disc' key={i}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className='text-lg font-semibold mb-3'>&#128221; {t('instructions')}:</h4>
        <p className='leading-7' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructions) }} />
      </div>

      <div className='flex flex-col sm:flex-row gap-1 items-start justify-between text-sm text-gray-400'>
        <p>{`${t('createdBy')} ${authorName}, ${format.dateTime(new Date(createdAt), formatConfig)}`}</p>
        <p className=''>{`${t('updatedOn')} ${format.dateTime(new Date(updatedAt), formatConfig)}`}</p>
      </div>
    </div>
  );
};
