'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, Text, TextInput } from '@mantine/core';
import * as termApi from '@/apis/termApi';
import TinymceEditor, { Editor } from '@/components/TinymceEditor';
import { Term } from '@/types/terms';

const CreateTermPage = () => {
  const queryClient = useQueryClient();
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<Term>();
  const router = useRouter();

  const { mutate: createTerm } = useMutation({
    mutationFn: termApi.createTerm,
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
      <TextInput label="약관 경로" {...form.register('path')} />
      <Stack gap={8}>
        <Text>약관 내용</Text>
        <TinymceEditor
          onInit={(_evt, editor) => {
            editorRef.current = editor;
          }}
        />
      </Stack>

      <Button type="submit">저장</Button>
    </Stack>
  );
};

export default CreateTermPage;
