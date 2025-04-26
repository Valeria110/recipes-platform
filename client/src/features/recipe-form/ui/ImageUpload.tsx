'use client';

import { useFormContext } from 'react-hook-form';
import { IRecipeForm } from '../model';
import Image from 'next/image';
import { trashSvg } from '@/shared/assets';
import { useEffect, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { cloudUploadPreset } from '../config/cloudinary-config';
import { CiCirclePlus } from 'react-icons/ci';
import { useTranslations } from 'next-intl';

interface IProps {
  onChange: (e: string) => void;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
    resource_type: string;
  };
}

export const ImageUpload = ({ onChange }: IProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const t = useTranslations('ShareRecipePage.RecipeForm.ImageUpload');

  const {
    formState: { errors },
  } = useFormContext<IRecipeForm>();

  useEffect(() => {
    const formData = sessionStorage.getItem('formData');
    if (formData) {
      const image = JSON.parse(formData).imageUrl;
      if (image) {
        setImageUrl(image);
      }
    }
  }, []);

  const handleUpload = (result: CloudinaryUploadResult) => {
    if (result.event === 'success' && result.info.resource_type === 'image') {
      const uploadedImageUrl: string = result.info.secure_url;
      setImageUrl(uploadedImageUrl);
      onChange(uploadedImageUrl);
    } else {
      removeImage();
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    onChange('');
  };

  return (
    <section className='flex flex-col gap-10'>
      <div>
        <h3 className='text-2xl font-semibold mb-2'>{t('title')}</h3>
        <p className='text-gray-500'>{t('subtitle')}</p>

        <div className='relative flex justify-center items-center w-72 h-72 md:w-48 md:h-48 lg:w-36 lg:h-36 mt-3 border-2 overflow-hidden border-orange-400 border-dashed rounded-2xl'>
          {imageUrl ? (
            <img
              className='absolute object-cover w-full h-full hoverable:hover:cursor-pointer hoverable:hover:scale-110 ease-in-out duration-300'
              src={imageUrl}
              alt='uploaded image for the recipe'
            />
          ) : (
            <CldUploadWidget
              uploadPreset={cloudUploadPreset}
              options={{
                maxFiles: 1,
                multiple: false,
                maxImageFileSize: 5 * 1024 * 1024,
                resourceType: 'image',
                showCompletedButton: true,
                cropping: true,
              }}
              onSuccess={(result) => {
                handleUpload(result as CloudinaryUploadResult);
              }}
              onQueuesEnd={(_, { widget }) => {
                widget.close();
              }}
            >
              {({ open }) => (
                <button
                  type='button'
                  onClick={() => open()}
                  className='flex justify-center items-center w-full h-full p-3 '
                >
                  <CiCirclePlus size={40} className='text-orange-400' />
                </button>
              )}
            </CldUploadWidget>
          )}
        </div>

        {imageUrl && (
          <button onClick={removeImage} type='button' className='mt-2'>
            <Image src={trashSvg} alt='delete button svg image' width={25} height={25} />
          </button>
        )}

        {errors.imageUrl && <p className='mt-3 text-sm text-red-600'>{errors.imageUrl.message}</p>}
      </div>
    </section>
  );
};
