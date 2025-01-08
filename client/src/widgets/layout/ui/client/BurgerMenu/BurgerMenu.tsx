'use client';

import { useEffect, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import { ProfileToolKit } from '../Header/ProfileToolKit';
import { NavBar } from '../../server/NavBar/NavBar';
import { Logo } from '@/shared/ui/server';

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleBurgerBtn = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className='md:hidden sticky flex justify-between items-center top-0 left-0 w-dvw h-28 p-8 bg-orange-400 z-20'>
        <Logo onClick={closeMenu} />
        <button onClick={toggleBurgerBtn} className='flex flex-col gap-1 justify-center items-center w-11 h-11 ml-auto'>
          <span
            className={`relative left-0 w-8 rounded-lg bg-white ${styles.burgerLine} ${isMenuOpen && styles.burgerCrossLine}`}
          ></span>
          <span
            className={`relative left-0 w-8 rounded-lg bg-white ${styles.burgerLine} ${isMenuOpen && styles.burgerCrossLine}`}
          ></span>
        </button>
      </header>
      <div
        className={`fixed top-28 w-dvw h-fit flex flex-col gap-10 justify-center items-center md:hidden bg-orange-400 p-5 z-20 ${styles.menuContainer} ${isMenuOpen && styles.openMenu} `}
      >
        <NavBar onClick={closeMenu} />
        <ProfileToolKit closeMenu={closeMenu} />
      </div>
    </>
  );
};
