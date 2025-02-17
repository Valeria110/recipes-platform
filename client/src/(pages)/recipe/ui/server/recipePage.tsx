import { IRecipeRes, usersService } from '@/shared/api';
import { RecipeImage } from '@/shared/ui/client';
import { CookingTimeInfo, ServingNumberInfo } from '@/shared/ui/server';
import DOMPurify from 'isomorphic-dompurify';

interface IRecipeData extends Omit<IRecipeRes, 'authorId' | 'id'> {
  authorId?: string | null;
  id?: string | null;
}

interface IProps {
  recipeData: IRecipeData;
}

export const RecipePage = async ({ recipeData }: IProps) => {
  const { title, imageUrl, authorId, ingredients, instructions, cookingTime, createdAt, updatedAt, servingNum } =
    recipeData;

  let authorName = 'unknown author';
  if (authorId) {
    const user = await usersService.getUserById(authorId);
    authorName = user.name;
  }

  return (
    <div className='flex flex-col gap-7 p-6'>
      <h2 className='text-2xl font-semibold mx-auto md:mx-0 sm:text-3xl'>{title}</h2>
      {imageUrl && <RecipeImage url={imageUrl} />}

      <div className='flex flex-col gap-2'>
        <CookingTimeInfo cookingTime={cookingTime} />
        <ServingNumberInfo peopleNum={servingNum} />
      </div>

      <div>
        <h4 className='text-lg font-semibold mb-3'>&#129361; Ingredients:</h4>
        <ul className='flex flex-col gap-2 ml-5'>
          {ingredients.map((ingredient, i) => (
            <li className='list-disc' key={i}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className='text-lg font-semibold mb-3'>&#128221; Instructions:</h4>
        <p className='leading-7' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(instructions) }} />
      </div>

      <div className='flex justify-between text-sm text-gray-400'>
        <p>{`created by ${authorName}, ${new Date(createdAt).toDateString()}`}</p>
        <p className=''>{`updated on ${new Date(updatedAt).toDateString()}`}</p>
      </div>
    </div>
  );
};
