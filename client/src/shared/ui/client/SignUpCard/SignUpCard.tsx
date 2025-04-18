'use client';

import Image, { StaticImageData } from 'next/image';
import { Button } from '../../server/Button/Button';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useTranslations } from 'next-intl';

interface ISignUpCard {
  imgSrc: StaticImageData;
  children: string;
}

export const SignUpCard = ({ imgSrc, children }: ISignUpCard) => {
  const router = useRouter();
  const t = useTranslations('HomePage.SectionSignUp');

  return (
    <ErrorBoundary>
      <div className='flex flex-col sm:w-2/3 md:flex-row w-full lg:w-1/2 rounded-xl shadow-lg'>
        <Image className='w-full md:w-1/2 rounded-lg' src={imgSrc} alt='sugn up card image' width={200} />
        <div className='flex flex-col gap-3 justify-between w-full md:w-1/2 px-4 py-5 ml-3'>
          <h4 className='font-bold text-mlg'>{children}</h4>
          <p className='text-sm text-gray-400'>{t('description')}</p>
          <Button width={'min-w-fit w-28'} className='pl-2 pr-2' onClick={() => router.push('/signup')}>
            {t('Button')}
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};
