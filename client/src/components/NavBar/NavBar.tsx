import { NavLink } from './NavLink';

export const NavBar = () => {
  return (
    <nav className='flex gap-7'>
      <NavLink href='/'>Home</NavLink>
      <NavLink href='/recipes'>Recipes</NavLink>
      <NavLink href='/about'>About</NavLink>
    </nav>
  );
};
