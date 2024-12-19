import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '../../../public/header-logo2.png';
import { memo } from 'react';

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
