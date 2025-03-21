'use client';

import { EditProfileForm, ProfileSidebar, Recipes } from '@/features/profile/ui';
import { TokenService } from '@/shared/api';
import { useUser } from '@/shared/hooks';
import { Route } from '@/shared/types';
import { FiltersBtn, SearchBar } from '@/shared/ui/client';
import { Loader } from '@/shared/ui/server';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState<'favorites' | 'edit' | 'my recipes'>('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      setIsLoggedIn(true);
      setUserId(TokenService.getUserId());
    } else {
      router.replace(Route.LOGIN);
    }
  }, [router]);

  const { data: userData, error, isLoading } = useUser(userId);

  const getFavRecipesData = () => {
    if (userData?.favorites) {
      return userData.favorites.map((fav) => fav.recipe);
    }
    return null;
  };

  if (isLoggedIn) {
    return (
      <main className='flex gap-10 mt-10 p-5'>
        <ProfileSidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} userData={userData} />
        <section className='flex flex-col gap-5 w-full h-fit'>
          {(selectedSection === 'favorites' || selectedSection === 'my recipes') && (
            <div className='flex justify-end items-center gap-8'>
              <SearchBar className='border-1 border-gray-300'>Search for the recipes...</SearchBar>
              <FiltersBtn />
            </div>
          )}
          {error && <div className='mt-10'>Data fetching error &#128577;</div>}
          {isLoading && !error ? (
            <Loader />
          ) : (
            (selectedSection === 'favorites' && (
              <Recipes recipes={getFavRecipesData()} favsData={userData?.favorites} />
            )) ||
            (selectedSection === 'my recipes' && (
              <Recipes recipes={userData?.recipes ?? null} favsData={userData?.favorites} />
            ))
          )}
          {selectedSection === 'edit' && <EditProfileForm name={userData?.name} email={userData?.email} />}
        </section>
      </main>
    );
  }
};
