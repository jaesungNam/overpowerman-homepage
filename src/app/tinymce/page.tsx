'use client';

import dynamic from 'next/dynamic';
import { Loader, LoadingOverlay } from '@mantine/core';

const TinymcePage = dynamic(() => import('@/components/TinymcePage'), {
  loading: () => <Loader />,
  ssr: false,
});

const Page = () => {
  return <TinymcePage />;
};

export default Page;
