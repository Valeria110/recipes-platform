'use client';

import { usePathname, useRouter } from '@/shared/config/i18n/navigation';
import { Locale } from '@/shared/types';
import { useLocale } from 'next-intl';
import { GrLanguage } from 'react-icons/gr';

export const LangButton = () => {
  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();

  const changeLang = () => {
    router.push(path, { locale: locale === Locale.EN ? Locale.RU : Locale.EN });
  };

  return (
    <button className='flex justify-center items-center p-2 text-white gap-1' onClick={changeLang}>
      <GrLanguage size={25} />
      <span>{locale}</span>
    </button>
  );
};
