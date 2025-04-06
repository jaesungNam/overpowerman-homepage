'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, Stack, Text, TextInput } from '@mantine/core';
import * as termApi from '@/apis/termApi';
import TinymceEditor, { Editor } from '@/components/TinymceEditor';
import { Term } from '@/types/terms';

export type TermDetailPageProps = {
  term: Term;
};

const TermDetailPage: React.FC<TermDetailPageProps> = (props) => {
  const { term } = props;
  const { content } = term;
  const queryClient = useQueryClient();
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<Term>({
    defaultValues: term,
  });
  const router = useRouter();

  const { mutate: createTerm } = useMutation({
    mutationFn: termApi.updateTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['terms'],
      });
      router.push('./');
    },
  });

  return (
    <Stack
      component="form"
      gap={8}
      onSubmit={form.handleSubmit((formData, event) => {
        event?.preventDefault();
        const content = editorRef?.current?.getContent();
        if (content) {
          createTerm({
            ...formData,
            content,
          });
        }
      })}
    >
      <TextInput label="약관 경로" disabled {...form.register('path')} />
      <Stack gap={8}>
        <Text>약관 내용</Text>
        <TinymceEditor
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={content}
        />
      </Stack>

      <Button type="submit">저장</Button>
    </Stack>
  );
};

export default TermDetailPage;
