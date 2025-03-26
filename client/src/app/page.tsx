import { SectionSignUp, SectionWhy } from '@/widgets/home-page-sections/ui/server';
import { SearchBlock } from '@/widgets/search';

export default function Home() {
  return (
    <>
      <SearchBlock />
      <main className='flex flex-col gap-10 w-11/12 ml-auto mr-auto'>
        <SectionWhy />
        <SectionSignUp />
      </main>
    </>
  );
}
