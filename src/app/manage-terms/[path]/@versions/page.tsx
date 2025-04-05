import TermVersionsPage from '@/components/TermVersionsPage';
import { getTermVersions } from '@/utils/s3Utils';

type TermDetailPageParams = {
  path: string;
};

const Page = async (props: { params: TermDetailPageParams }) => {
  const { params } = props;
  const { path } = params;
  const versions = await getTermVersions(path);
  return <TermVersionsPage versions={versions} />;
};

export default Page;
