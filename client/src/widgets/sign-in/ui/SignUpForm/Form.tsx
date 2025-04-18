'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSignUpSchema } from '@/widgets/sign-in/model/signup.schema';
import { useRouter } from 'next/navigation';
import { login } from '@/features/user/user.slice';
import { useAppDispatch } from '@/shared/hooks/store.hooks';
import { useState } from 'react';
import { authService } from '@/shared/api';
import { FormInput, Button } from '@/shared/ui/server';
import { useLocale, useTranslations } from 'next-intl';

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

export const Form = () => {
  const locale = useLocale();
  const t = useTranslations('SignUpForm');
  const schema = getSignUpSchema(locale);
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
    if (typeof res !== 'string' && 'accessToken' in res && 'refreshToken' in res) {
      dispatch(login());
      router.replace('/');
    } else if (typeof res === 'string') {
      const errorData = JSON.parse(res);
      if ('errorMessage' in errorData) {
        setSignUpError(`${errorData.errorMessage}`);
      }
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-8 mt-8' action='POST'>
      <FormInput<ISignUpForm>
        register={register}
        name='name'
        label={t('name')}
        errors={errors}
        handleInput={() => setSignUpError('')}
      />
      <FormInput<ISignUpForm>
        register={register}
        type='email'
        name='email'
        label={t('email')}
        errors={errors}
        handleInput={() => setSignUpError('')}
      />
      <FormInput<ISignUpForm>
        register={register}
        type='password'
        name='password'
        label={t('password')}
        errors={errors}
        handleInput={() => setSignUpError('')}
      />
      <Button width='w-full' disabled={!isValid || isPending} type='submit'>
        {t('signUp')}
      </Button>
      <span className='text-md text-red-500'>{signUpError}</span>
    </form>
  );
};
