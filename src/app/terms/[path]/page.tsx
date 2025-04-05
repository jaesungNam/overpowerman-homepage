import { notFound } from 'next/navigation';
import TermPage from '@/components/TermPage';
import { getTerm } from '@/utils/s3Utils';

type TermDetailPageParams = {
  path: string;
};

const Page = async (props: {
  params: TermDetailPageParams;
  searchParams?: Promise<{
    versionId?: string;
  }>;
}) => {
  const {
    params: { path },
    searchParams,
  } = props;
  const versionId = (await searchParams)?.versionId;

  const term = await getTerm(path, versionId);

  if (!term) {
    return notFound();
  }

  return <TermPage term={term} />;
};

export default Page;
