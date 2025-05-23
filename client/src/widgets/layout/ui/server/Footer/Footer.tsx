import Image from 'next/image';
import { githubLogo } from '@/shared/assets';
import { getTranslations } from 'next-intl/server';

export const Footer = async () => {
  const t = await getTranslations('Footer');
  return (
    <footer className='flex flex-col md:flex-row gap-9 justify-between md:items-center p-5 mt-auto md:p-10 h-fit bg-neutral-800 text-white'>
      <div className='w-full sm:w-1/2 md:w-1/4'>
        <h3 className='font-semibold text-2xl mb-5'>Cookit</h3>
        <p className='text-gray-300'>{t('Text')}</p>
      </div>

      <span>2025</span>
      <a className='flex gap-3 items-center group' href='https://github.com/Valeria110' target='_blank'>
        <Image
          className='group-hover:scale-110 transition-transform duration-300 ease-in-out'
          src={githubLogo}
          alt='github logo'
          width={25}
        ></Image>
        Valeria110
      </a>
    </footer>
  );
};
