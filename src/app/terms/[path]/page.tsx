import { notFound } from 'next/navigation';
import TermPage from '@/components/TermPage';
import { getTerm } from '@/utils/s3Utils';

type TermDetailPageParams = {
  path: string;
};

const Page = async (props: {
  params: Promise<TermDetailPageParams>;
  searchParams?: Promise<{
    versionId?: string;
  }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const path = params.path;
  const versionId = searchParams?.versionId;

  const term = await getTerm(path, versionId);

  if (!term) {
    return notFound();
  }

  return <TermPage term={term} />;
};

export default Page;
