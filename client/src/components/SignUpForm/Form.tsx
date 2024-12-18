'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import { Button } from '../Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/validations/signup.schema';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/api/auth-service';
import { login } from '@/features/user/user.slice';
import { useAppDispatch } from '@/hooks/store.hooks';
import { useState } from 'react';

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signUpError, setSignUpError] = useState('');
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleFormSubmit: SubmitHandler<ISignUpForm> = async (formData) => {
    setIsPending(true);
    const { name, email, password } = formData;
    const res = await authService.signup(name, email, password);
    if ('accessToken' in res && 'refreshToken' in res) {
      dispatch(login());
      router.replace('/');
    } else if ('errorMessage' in res) {
      setSignUpError(`${res.errorMessage}`);
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-8 mt-8' action='POST'>
      <FormInput<ISignUpForm> register={register} name='name' label='Name' errors={errors} />
      <FormInput<ISignUpForm> register={register} type='email' name='email' label='Email' errors={errors} />
      <FormInput<ISignUpForm> register={register} type='password' name='password' label='Password' errors={errors} />
      <Button width='w-full' disabled={!isValid || isPending} type='submit'>
        Sign up
      </Button>
      <span className='text-md text-red-500'>{signUpError}</span>
    </form>
  );
};
