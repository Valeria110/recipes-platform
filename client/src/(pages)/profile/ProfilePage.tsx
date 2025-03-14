'use client';

import { ProfileSidebar } from '@/features/profile/ui';
import { TokenService, usersService } from '@/shared/api';
import { Route } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState<'favorites' | 'edit' | 'my recipes'>('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      router.replace(Route.LOGIN);
    }
  }, []);

  if (isLoggedIn) {
    return (
      <main className='flex gap-10 mt-10 p-5'>
        <ProfileSidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
        {selectedSection === 'favorites' && <h1>Favorite recipes</h1>}
        {selectedSection === 'edit' && <h1>Edit profile</h1>}
        {selectedSection === 'my recipes' && <h1>My recipes</h1>}
      </main>
    );
  }
};
