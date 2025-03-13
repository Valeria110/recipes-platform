import { PreviewPage } from '@/(pages)/recipe-preview/ui/PreviewPage';

type SearchParams = Promise<{ data?: string }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { data } = await searchParams;

  if (data) {
    return <PreviewPage data={data} />;
  } else {
    <p>Please, fill the form to see the preview</p>;
  }
}
