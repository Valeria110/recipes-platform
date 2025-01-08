'use client';

import Image from 'next/image';
import { headerLogo } from '@/shared/assets';
import { Form } from './Form';
import { ErrorBoundary } from '@/shared/ui/client/ErrorBoundary/ErrorBoundary';
import { StoreProvider } from '@/shared/ui/client';

export const LoginForm = () => {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <div className='relative flex flex-col gap-4 w-11/12 sm:w-2/3 h-fit md:w-5/12 p-4 px-8 pb-10 bg-white rounded-3xl z-10'>
          <div className='flex justify-center'>
            <Image src={headerLogo} alt='recipe platform logo' width={60} />
          </div>
          <h2 className='text-xl lg:text-2xl font-semibold text-left'>Welcome back!</h2>
          <Form />
        </div>
      </ErrorBoundary>
    </StoreProvider>
  );
};
