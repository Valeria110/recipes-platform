import { useFormContext } from 'react-hook-form';
import { IRecipeForm } from '../model';
import Image from 'next/image';
import { addImgSvg, trashSvg } from '@/shared/assets';
import { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

interface IProps {
  onChange: (e: File | string) => void;
}

export const ImageUpload = ({ onChange }: IProps) => {
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>(null);
  const {
    formState: { errors },
  } = useFormContext<IRecipeForm>();
  const [uploadError, setUploadError] = useState<FileRejection | null>(null);

  useEffect(() => {
    const imageBase64 = sessionStorage.getItem('imageBase64');
    if (imageBase64) {
      setFileUrl(imageBase64);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        setFileUrl(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }

    if (rejectedFiles.length) {
      setUploadError(rejectedFiles[0]);
    } else {
      setUploadError(null);
    }
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeImage = () => {
    onChange('');
    setFileUrl(null);
    sessionStorage.removeItem('imageBase64');
  };

  return (
    <section className='flex flex-col gap-10'>
      <div>
        <h3 className='text-2xl font-semibold mb-2'>Gallery</h3>
        <p className='text-gray-500'>
          Boost reliability and engagement by sharing up to 8 images of your mouthwatering creations! (An image should
          not exceed 5Mb)
        </p>

        <div
          {...getRootProps({
            className:
              'relative overflow-hidden flex justify-center items-center w-72 h-72 md:w-48 md:h-48 lg:w-36 lg:h-36 mt-3 border-2 border-orange-400 border-dashed rounded-2xl hoverable:hover:cursor-pointer',
          })}
        >
          {fileUrl ? (
            <img
              className='absolute object-cover w-full h-full hoverable:hover:cursor-pointer hoverable:hover:scale-110 ease-in-out duration-300'
              src={fileUrl as string}
              alt='uploaded image for the recipe'
            />
          ) : (
            <>
              <input {...getInputProps({ type: 'file', name: 'image' })} />
              {isDragActive ? (
                <p className='p-5 text-sm text-center'>Drop your image here</p>
              ) : (
                <Image src={addImgSvg} alt='add image svg' width={40} height={40} />
              )}
            </>
          )}
        </div>
        {fileUrl && (
          <button onClick={removeImage} type='button' className='mt-2'>
            <Image src={trashSvg} alt='delete button svg image' width={25} height={25} />
          </button>
        )}
        {uploadError && (
          <p className='mt-3 text-sm text-red-600'>{`${uploadError.file.name} - ${uploadError.errors[0].code === 'file-too-large' ? 'file is too large' : uploadError.errors[0].message}`}</p>
        )}
        {errors.image && <p className='mt-3 text-sm text-red-600'>{errors.image.message}</p>}
      </div>
    </section>
  );
};
