import Link from 'next/link';

interface INavLink {
  children: string;
  href: string;
}
export const NavLink = ({ children, href }: INavLink) => {
  return (
    <Link className='text-white hover:underline hover:cursor-pointer' href={href}>
      {children}
    </Link>
  );
};
