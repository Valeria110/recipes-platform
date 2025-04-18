import { memo } from 'react';
import { NavLink } from './NavLink';
import { useTranslations } from 'next-intl';

interface INavBarProps {
  onClick?: () => void;
}

export const NavBar = memo(({ onClick }: INavBarProps) => {
  const t = useTranslations('HomePage.NavBar');
  return (
    <nav className='flex flex-col md:flex-row gap-7'>
      <NavLink onClick={onClick} href='/'>
        {t('Home')}
      </NavLink>
      <NavLink onClick={onClick} href='/recipes'>
        {t('Recipes')}
      </NavLink>
      <NavLink onClick={onClick} href='/about'>
        {t('About')}
      </NavLink>
    </nav>
  );
});
