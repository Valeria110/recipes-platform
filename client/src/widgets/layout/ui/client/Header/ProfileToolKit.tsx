'use client';

import { login, logout } from '@/features/user/user.slice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store.hooks';
import Image from 'next/image';
import { useEffect } from 'react';
import { profileSvg } from '@/shared/assets';
import { logoutSvg } from '@/shared/assets';
import { Button } from '@/shared/ui/server/Button/Button';
import { authService } from '@/shared/api';
import { Route } from '@/shared/types';
import { useTranslations } from 'next-intl';
import { LangButton } from '@/shared/ui/client';
import { Link, useRouter } from '@/shared/config/i18n/navigation';

interface IProfileToolKitProps {
  closeMenu?: () => void;
}

export const ProfileToolKit = ({ closeMenu }: IProfileToolKitProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const t = useTranslations('HomePage.ProfileToolKit');

  const router = useRouter();
  useEffect(() => {
    const checkUserAuthorization = async () => {
      const res = await authService.refreshToken();
      if ('accessToken' in res) {
        dispatch(login());
      }
    };

    checkUserAuthorization();
  }, []);

  const handleLogOut = () => {
    authService.logout();
    dispatch(logout());
    router.push(`${Route.HOME}`);
    if (closeMenu) {
      closeMenu();
    }
  };
  const handleSignUp = () => {
    router.push(`${Route.SIGNUP}`);
    if (closeMenu) {
      closeMenu();
    }
  };
  const handleLogIn = () => {
    router.push(`${Route.LOGIN}`);
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-7'>
      {isLoggedIn ? (
        <div className='flex flex-col sm:flex-row mt-5 sm:mt-0 gap-3 items-center'>
          <Button
            width='w-fit'
            onClick={() => {
              if (closeMenu) {
                closeMenu();
              }
              sessionStorage.removeItem('formData');
              router.push(Route.SHARE_RECIPE);
            }}
            className='p-3 lg:mr-3 bg-white !text-orange-400 hoverable:hover:!text-white order-3 sm:order-none'
          >
            {t('ShareRecipe')}
          </Button>
          <Link
            className='order-1 sm:order-none p-2 hoverable:hover:scale-110 ease-in-out duration-300'
            href='/profile'
            onClick={() => closeMenu && closeMenu()}
          >
            <Image src={profileSvg} alt='user profile svg' width={45} />
          </Link>
          <Button width='w-28' className='border-white order-2 sm:order-none' onClick={handleLogOut}>
            {t('LogOut')}
            <Image src={logoutSvg} alt='logout svg' width={25} />
          </Button>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row items-center gap-3'>
          <button
            onClick={handleSignUp}
            className='flex justify-center items-center rounded-3xl border-2 border-white bg-white text-orange-400  hoverable:hover:bg-orange-700 hoverable:hover:text-white hoverable:hover:border-orange-700 active:bg-orange-700 active:text-white active:border-orange-700 transition-colors duration-200 ease-in-out min-w-fit w-28 h-11 pl-3 pr-3'
          >
            {t('SignUp')}
          </button>
          <button
            onClick={handleLogIn}
            className='flex justify-center items-center rounded-3xl border-2 border-white bg-orange-400 text-white hoverable:hover:text-orange-700 hoverable:hover:border-orange-700 active:text-orange-700 active:border-orange-700 transition-colors duration-200 ease-in-out w-28 h-11'
          >
            {t('LogIn')}
          </button>
        </div>
      )}

      <LangButton />
    </div>
  );
};
