import { SectionTopRecipes } from '@/widgets/home-page-sections/ui/client';
import { SectionSignUp } from '@/widgets/home-page-sections/ui/server';
import { SearchBlock } from '@/widgets/search';

export default function Home() {
  return (
    <>
      <SearchBlock />
      <main className='flex flex-col gap-10 w-11/12 ml-auto mr-auto'>
        <SectionTopRecipes />
        <SectionSignUp />
      </main>
    </>
  );
}
