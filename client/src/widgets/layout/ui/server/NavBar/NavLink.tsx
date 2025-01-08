import Link from 'next/link';
import { memo } from 'react';

interface INavLink {
  children: string;
  href: string;
  onClick?: () => void;
}
export const NavLink = memo(({ children, href, onClick }: INavLink) => {
  return (
    <Link
      className='text-2xl md:text-lg text-white hoverable:hover:underline hoverable:hover:cursor-pointer'
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});
