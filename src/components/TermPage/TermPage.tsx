'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, Text, TextInput } from '@mantine/core';
import * as termApi from '@/apis/termApi';
import TinymceEditor, { Editor } from '@/components/TinymceEditor';
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
