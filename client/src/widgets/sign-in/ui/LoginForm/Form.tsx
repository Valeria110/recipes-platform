'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/hooks/store.hooks';
import { login } from '@/features/user/user.slice';
import { useState } from 'react';
import { authService } from '@/shared/api';
import { schema } from '../../model/login.schema';
import { FormInput, Button } from '@/shared/ui/server';

export interface ILoginForm {
  email: string;
  password: string;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState('');
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleFormSubmit: SubmitHandler<ILoginForm> = async (formData) => {
    setIsPending(true);
    const { email, password } = formData;
    const res = await authService.login(email, password);
    if (typeof res !== 'string' && 'accessToken' in res && 'refreshToken' in res) {
      dispatch(login());
      router.replace('/');
    } else if (typeof res === 'string') {
      const errorData = JSON.parse(res);
      if ('errorMessage' in errorData) {
        setLoginError(`${errorData.errorMessage}`);
      }
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-8 mt-8' action='POST'>
      <FormInput<ILoginForm>
        register={register}
        type='email'
        name='email'
        label='Email'
        errors={errors}
        handleInput={() => setLoginError('')}
      />
      <FormInput<ILoginForm>
        register={register}
        type='password'
        name='password'
        label='Password'
        errors={errors}
        handleInput={() => setLoginError('')}
      />
      <Button width='w-full' disabled={!isValid || isPending} type='submit'>
        Login
      </Button>
      <span className='text-md text-red-500'>{loginError}</span>
    </form>
  );
};
