'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, MantineProvider } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
});

const Providers: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
};

export default Providers;
