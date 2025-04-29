import Image from 'next/image';
import { headerLogo } from '@/shared/assets';
import { memo } from 'react';
import { Link } from '@/shared/config/i18n/navigation';

interface ILogoProps {
  onClick?: () => void;
}

export const Logo = memo(({ onClick }: ILogoProps) => {
  return (
    <Link onClick={onClick} href='/'>
      <Image src={headerLogo} height={60} alt='CookIt logo' />
    </Link>
  );
});
