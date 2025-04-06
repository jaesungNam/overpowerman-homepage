import '@mantine/core/styles.css';
import 'react-notion-x/src/styles.css';

import React from 'react';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Providers from '@/providers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Overpowerman | 오버파워맨',
  description: 'overpowerman 의 홈페이지입니다.',
  openGraph: {
    type: 'website',
    title: 'Overpowerman | 오버파워맨 OG',
    description: '디스크립션 Overpowerman | 오버파워맨 OG',
  },
};
