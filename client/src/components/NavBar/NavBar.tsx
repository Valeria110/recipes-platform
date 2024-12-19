import { memo } from 'react';
import { NavLink } from './NavLink';

interface INavBarProps {
  onClick?: () => void;
}

export const NavBar = memo(({ onClick }: INavBarProps) => {
  return (
    <nav className='flex flex-col md:flex-row gap-7'>
      <NavLink onClick={onClick} href='/'>
        Home
      </NavLink>
      <NavLink onClick={onClick} href='/recipes'>
        Recipes
      </NavLink>
      <NavLink onClick={onClick} href='/about'>
        About
      </NavLink>
    </nav>
  );
});
