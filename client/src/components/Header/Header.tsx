'use client';

import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import headerLogo from '../../../public/header-logo2.png';
import { NavBar } from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { getUserToken, isLoggedIn } from '@/app/api/api';
import { ProfileToolKit } from './ProfileToolKit/ProfileToolKit';

export const Header = () => {
  //   const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(isUserLoggedIn);
  useEffect(() => {
    // const checkUserAuthorization = async () => {
    //   const accessToken = getUserToken('access_token') ?? '';
    //   const refreshToken = getUserToken('refresh_token') ?? '';
    //   const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') ? true : false;
    //   const data = await isLoggedIn(accessToken, refreshToken);
    //   console.log(data);
    //   console.log('accessToken: ', accessToken, refreshToken);
    // };
    // checkUserAuthorization();
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 z-10 flex flex-col lg:flex-row items-center justify-between bg-orange-400 px-4 py-2 h-52 lg:h-20 ${styles.header}`}
    >
      <Link href='/'>
        <Image className={styles.imgLogo} src={headerLogo} height={60} alt='CookIt logo' />
      </Link>
      <NavBar />
      <ProfileToolKit />
    </header>
  );
};
