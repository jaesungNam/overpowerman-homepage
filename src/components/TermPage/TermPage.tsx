'use client';

import React from 'react';
import { Box } from '@mantine/core';
import { Term } from '@/types/terms';

export type TermDetailPageProps = {
  term: Term;
};

const TermPage: React.FC<TermDetailPageProps> = (props) => {
  const { term } = props;

  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: term.content || '',
      }}
    />
  );
};

export default TermPage;
