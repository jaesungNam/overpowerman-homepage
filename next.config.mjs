import bundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(
  withNextIntl({
    output: 'standalone',
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
  })
);
