'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getUserData } from '../api';
import { IUser } from '@/shared/model';
import { Button, TabButton } from '@/shared/ui/server';
import { logoutSvg } from '@/shared/assets';
import Image from 'next/image';
import { logout } from '@/features/user/user.slice';
import { authService } from '@/shared/api';
import { Route } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { useRouter } from 'next/navigation';

interface IProps {
  setSelectedSection: Dispatch<SetStateAction<'favorites' | 'edit' | 'my recipes'>>;
  selectedSection: 'favorites' | 'edit' | 'my recipes';
}

export const ProfileSidebar = ({ setSelectedSection, selectedSection }: IProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUserNameAndEmail = async () => {
      const userData = await getUserData();
      if (userData) {
        console.log(userData);

        setUserData(userData);
      }
    };

    getUserNameAndEmail();
  }, []);

  const handleLogOut = () => {
    authService.logout();
    dispatch(logout());
    router.push(`${Route.HOME}`);
  };

  return (
    <div className='flex flex-col items-center gap-10 w-72 min-h-80 p-5 rounded-2xl shadow-xl shadow-black/10'>
      {userData && (
        <div className='flex flex-col items-center gap-7'>
          <div className='flex flex-col items-center gap-1'>
            <h4 className='font-semibold text-2xl'>{userData.name}</h4>
            <p className='text-sm text-gray-600'>{userData.email}</p>
          </div>

          <div className='flex gap-2'>
            <div className='flex flex-col items-center gap-1'>
              <p>posts</p>
              <p className='text-sm text-gray-500'>{userData.recipes.length}</p>
            </div>
            <p className='text-md text-gray-300'>|</p>
            <div className='flex flex-col items-center gap-1'>
              <p>favs</p>
              <p className='text-sm text-gray-500'>{userData.favorites.length}</p>
            </div>
          </div>
        </div>
      )}

      <div className='w-full flex flex-col gap-4'>
        <TabButton
          text='Favorite recipes'
          onClick={() => setSelectedSection('favorites')}
          isSelected={selectedSection === 'favorites'}
        />
        <TabButton
          text='My recipes'
          onClick={() => setSelectedSection('my recipes')}
          isSelected={selectedSection === 'my recipes'}
        />
        <TabButton
          text='Edit profile'
          onClick={() => setSelectedSection('edit')}
          isSelected={selectedSection === 'edit'}
        />
      </div>

      <Button width='w-full' className='border-white order-2 sm:order-none mt-5' onClick={handleLogOut}>
        Log out
        <Image src={logoutSvg} alt='logout svg' width={25} />
      </Button>
    </div>
  );
};
