'use client';

import { StoreProvider } from '@/shared/ui/client';
import { ResultsSection } from '@/widgets/results-section/ui/client';
import { SearchSection } from '@/widgets/search';

export default function RecipesPage() {
  return (
    <StoreProvider>
      <div className='p-4 lg:p-10'>
        <SearchSection />
        <ResultsSection />
      </div>
    </StoreProvider>
  );
}
