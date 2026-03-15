import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/lib/next-intl/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  env: {
    BUILD_DATE: new Date().toISOString(),
    BUILD_GITHUB_SHA: process.env.GITHUB_SHA,
  },
};

export default withBundleAnalyzer(
  withNextIntl(
    config
  )
);
