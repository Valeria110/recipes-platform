'use client';

import styles from './Header.module.scss';
import { NavBar } from '../NavBar/NavBar';
import { ProfileToolKit } from './ProfileToolKit/ProfileToolKit';
import { StoreProvider } from '../StoreProvider/StoreProvider';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <header
          className={`hidden sticky top-0 left-0 z-20 md:flex flex-col lg:flex-row items-center justify-between bg-orange-400 px-4 py-2 h-52 lg:h-20 ${styles.header}`}
        >
          <Logo />
          <NavBar />
          <ProfileToolKit />
        </header>
        <BurgerMenu></BurgerMenu>
      </ErrorBoundary>
    </StoreProvider>
  );
};
