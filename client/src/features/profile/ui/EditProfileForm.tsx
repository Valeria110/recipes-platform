import { Button, TextField } from '@/shared/ui/server';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { IEditForm, schema } from '../model';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { authService, usersService } from '@/shared/api';

interface IProps {
  name?: string;
  email?: string;
}

export const EditProfileForm = ({ name = '', email = '' }: IProps) => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    control,
  } = useForm<IEditForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { name, email, oldPassword: '', newPassword: '' },
  });

  const watchFields = useWatch({ control, defaultValue: { name, email, oldPassword: '', newPassword: '' } });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<IEditForm> = async (formData) => {
    console.log('formData: ', formData);
    const { success, error } = await authService.updateUserAuthData(formData);
    if (!success && error) {
      setSubmitError(error);
    }
    if (success && !error) {
      setSubmitError(null);
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
        <TextField label='Name' register={register} registerName='name' width='w-full' error={errors.name} />
        <TextField label='Email' register={register} registerName='email' width='w-full' error={errors.email} />
        <TextField
          label='Old password'
          register={register}
          registerName='oldPassword'
          type='password'
          width='w-full'
          error={errors.oldPassword}
        />
        <TextField
          label='New password'
          register={register}
          registerName='newPassword'
          type='password'
          width='w-full'
          error={errors.newPassword}
        />
        <Button width='w-full' type='submit' disabled={!isFormChanged || !isValid || isSubmitting}>
          Save
        </Button>
        {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
      </form>
    </div>
  );
};
