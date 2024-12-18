'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import { Button } from '../Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/validations/login.schema';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/api/auth-service';
import { useAppDispatch } from '@/hooks/store.hooks';
import { login } from '@/features/user/user.slice';
import { useState } from 'react';

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
    if ('accessToken' in res && 'refreshToken' in res) {
      dispatch(login());
      router.replace('/');
    } else if ('errorMessage' in res) {
      setLoginError(`${res.errorMessage}`);
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-8 mt-8' action='POST'>
      <FormInput<ILoginForm> register={register} type='email' name='email' label='Email' errors={errors} />
      <FormInput<ILoginForm> register={register} type='password' name='password' label='Password' errors={errors} />
      <Button width='w-full' disabled={!isValid || isPending} type='submit'>
        Login
      </Button>
      <span className='text-md text-red-500'>{loginError}</span>
    </form>
  );
};
