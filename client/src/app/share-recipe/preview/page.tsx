import { PreviewPage } from '@/(pages)/recipe-preview/ui/PreviewPage';

export default async function Page({ searchParams }: { searchParams: { data?: string } }) {
  const { data } = await searchParams;
  if (data) {
    return <PreviewPage data={data} />;
  } else {
    <p>Please, fill the form to see the preview</p>;
  }
}
