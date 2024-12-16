import { Button } from '@/components/Button/Button';
import { SearchBlock } from '@/components/SearchBlock/SearchBlock';
import { SectionSignUp } from '@/components/home-page-sections/SectionSignUp/SectionSignUp';
import { SectionTopRecipes } from '@/components/home-page-sections/SectionTopRecipes/SectionTopRecipes';

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
