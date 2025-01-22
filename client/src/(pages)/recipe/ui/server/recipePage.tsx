import { IRecipeRes, usersService } from '@/shared/api';
import { CookingTimeInfo, ServingNumberInfo } from '@/shared/ui/server';

interface IProps {
  recipeData: IRecipeRes;
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
      <div className='relative w-full sm:w-3/4 lg:w-2/5 h-80 flex justify-center items-center rounded-2xl overflow-hidden'>
        <img
          className='absolute w-full h-full object-cover hoverable:hover:scale-110 active:scale-110 transition-transform duration-500 ease-in-out'
          src={imageUrl ?? ''}
          alt='recipe image'
        />
      </div>

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
        <p className='leading-7'>{instructions}</p>
      </div>

      <div className='flex justify-between text-sm text-gray-400'>
        <p>{`created by ${authorName}, ${new Date(createdAt).toDateString()}`}</p>
        <p className=''>{`updated on ${new Date(updatedAt).toDateString()}`}</p>
      </div>
    </div>
  );
};
