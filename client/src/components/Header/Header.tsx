'use client';

import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '../../../public/header-logo2.png';
import { NavBar } from '../NavBar/NavBar';
// import { useEffect, useState } from 'react';
import { ProfileToolKit } from './ProfileToolKit/ProfileToolKit';
import { StoreProvider } from '../StoreProvider/StoreProvider';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const Header = () => {
  //   const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(isUserLoggedIn);
  // useEffect(() => {
  //   const checkUserAuthorization = async () => {
  //     const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') ? true : false;
  //   };
  //   checkUserAuthorization();
  // }, []);
  return (
    <StoreProvider>
      <ErrorBoundary>
        <header
          className={`sticky top-0 left-0 z-20 flex flex-col lg:flex-row items-center justify-between bg-orange-400 px-4 py-2 h-52 lg:h-20 ${styles.header}`}
        >
          <Link href='/'>
            <Image className={styles.imgLogo} src={headerLogo} height={60} alt='CookIt logo' />
          </Link>
          <NavBar />
          <ProfileToolKit />
        </header>
      </ErrorBoundary>
    </StoreProvider>
  );
};
