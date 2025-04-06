'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Box, Button } from '@mantine/core';
import * as termApi from '@/apis/termApi';

const ManageTermsPage = () => {
  const pathname = usePathname();
  const { data: terms } = useQuery({
    queryFn: termApi.getTerms,
    queryKey: ['terms'],
  });

  return (
    <Box>
      <Button component={NextLink} href={`${pathname}/create-term`}>
        약관 만들기
      </Button>
      {JSON.stringify(terms)}
    </Box>
  );
};

export default ManageTermsPage;
