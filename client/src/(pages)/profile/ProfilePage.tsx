'use client';

import { EditProfileForm, ProfileSidebar, Recipes } from '@/features/profile/ui';
import { resetAllFilters, setSearchValue } from '@/features/user/search.slice';
import { TokenService } from '@/shared/api';
import { useRouter } from '@/shared/config/i18n/navigation';
import { useAppDispatch, useUser } from '@/shared/hooks';
import { Route } from '@/shared/types';
import { ErrorBoundary, FiltersBtn, SearchBar } from '@/shared/ui/client';
import { Loader } from '@/shared/ui/server';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState<'favorites' | 'edit' | 'my recipes'>('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations('SearchBlock');

  useEffect(() => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      setIsLoggedIn(true);
      setUserId(TokenService.getUserId());
    } else {
      router.replace(Route.LOGIN);
    }
  }, [router]);

  useEffect(() => {
    dispatch(resetAllFilters());
    dispatch(setSearchValue(''));
  }, []);

  const { data: userData, error, isLoading } = useUser(userId);

  const getFavRecipesData = () => {
    if (userData?.favorites) {
      return userData.favorites.map((fav) => fav.recipe);
    }
    return null;
  };

  if (isLoggedIn) {
    return (
      <ErrorBoundary>
        <main className='flex flex-col items-center md:items-start md:flex-row gap-16 md:gap-10 mt-10 p-5'>
          <ProfileSidebar
            setSelectedSection={setSelectedSection}
            selectedSection={selectedSection}
            userData={userData}
          />
          <section className='flex flex-col gap-5 w-full h-fit'>
            {(selectedSection === 'favorites' || selectedSection === 'my recipes') && (
              <div className='flex flex-col lg:flex-row md:items-end lg:justify-end lg:items-center gap-8'>
                <SearchBar className='border-1 border-gray-300'>{t('placeholder')}</SearchBar>
                <FiltersBtn />
              </div>
            )}
            {selectedSection !== 'edit' && error && <div className='mt-10'>Data fetching error &#128577;</div>}
            {selectedSection !== 'edit' && isLoading && !error ? (
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
      </ErrorBoundary>
    );
  }
};
