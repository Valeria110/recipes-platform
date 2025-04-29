'use client';

import { ProfilePage } from '@/(pages)/profile';
import { StoreProvider } from '@/shared/ui/client';

export default function Page() {
  return (
    <StoreProvider>
      <ProfilePage />
    </StoreProvider>
  );
}
