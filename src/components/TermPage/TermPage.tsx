'use client';

import { NotionRenderer } from 'react-notion-x';

export type TermPageProps = {
  recordMap: any;
};

const TermPage: React.FC<TermPageProps> = (props) => {
  const { recordMap } = props;

  return <NotionRenderer recordMap={recordMap} />;
};

export default TermPage;
