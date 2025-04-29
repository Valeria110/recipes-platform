import { TextField } from '@/shared/ui/client';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { IEditForm, schema } from '../model';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { authService } from '@/shared/api';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/shared/ui/server';
import { useTranslations } from 'next-intl';

interface IProps {
  name?: string;
  email?: string;
}

export const EditProfileForm = ({ name = '', email = '' }: IProps) => {
  const t = useTranslations('ProfilePage.EditProfileForm');
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    control,
    resetField,
  } = useForm<IEditForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { name, email, oldPassword: '', newPassword: '' },
  });

  const watchFields = useWatch({ control, defaultValue: { name, email, oldPassword: '', newPassword: '' } });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<IEditForm> = async (formData) => {
    const { success, error } = await authService.updateUserAuthData(formData);
    if (!success && error) {
      setSubmitError(error);
      toast.error(`${t('toastErrorMsg')}: ${error}`);
    }
    if (success && !error) {
      setSubmitError(null);
      resetField('oldPassword');
      resetField('newPassword');
      toast.success(t('toastSuccessMsg'));
    }
  };

  useEffect(() => {
    const { newPassword, oldPassword } = watchFields;
    const hasFormChanged =
      watchFields.name !== name || watchFields.email !== email || newPassword !== '' || oldPassword !== '';
    setIsFormChanged(hasFormChanged);
  }, [watchFields, name, email]);

  return (
    <div className='w-full flex justify-center'>
      <form action='' className='w-80 flex flex-col gap-8' onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField label={t('name')} register={register} registerName='name' width='w-full' error={errors.name} />
        <TextField label={t('email')} register={register} registerName='email' width='w-full' error={errors.email} />
        <TextField
          label={t('oldPassword')}
          register={register}
          registerName='oldPassword'
          type='password'
          width='w-full'
          error={errors.oldPassword}
        />
        <TextField
          label={t('newPassword')}
          register={register}
          registerName='newPassword'
          type='password'
          width='w-full'
          error={errors.newPassword}
        />
        <Button width='w-full' type='submit' disabled={!isFormChanged || !isValid || isSubmitting}>
          {t('saveBtn')}
        </Button>
        {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
      </form>
      <ToastContainer />
    </div>
  );
};
