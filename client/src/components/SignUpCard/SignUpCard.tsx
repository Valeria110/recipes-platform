'use client';

import Image, { StaticImageData } from 'next/image';
import { Button } from '../Button/Button';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ISignUpCard {
  imgSrc: StaticImageData;
}

export const SignUpCard = ({ imgSrc }: ISignUpCard) => {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <div className='flex flex-col md:flex-row w-2/3 lg:w-1/2 rounded-xl shadow-lg'>
        <Image className='w-full md:w-1/2 rounded-lg' src={imgSrc} alt='sugn up card image' width={200} />
        <div className='flex flex-col gap-3 justify-between w-full md:w-1/2 px-4 py-5 ml-3'>
          <h4 className='font-bold text-mlg'>Sign up to explore your wished recipes</h4>
          <p className='text-sm text-gray-400'>
            Create an account and explore your desired recipes and follow your favorite creators and many more!
          </p>
          <Button width={'w-28'} onClick={() => router.push('/signup')}>
            Sign up
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};
