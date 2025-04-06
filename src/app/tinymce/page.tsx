'use client';

import dynamic from 'next/dynamic';
import { Loader } from '@mantine/core';

const TinymcePage = dynamic(() => import('../../components/TinymceEditor/TinymceEditor'), {
  loading: () => <Loader />,
  ssr: false,
});

const Page = () => {
  return <TinymcePage />;
};

export default Page;
