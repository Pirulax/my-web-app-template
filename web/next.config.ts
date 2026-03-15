import type { NextConfig } from 'next';
import fs from 'fs';
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
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
    NEXT_PUBLIC_VERSION:
      fs.readFileSync('./VERSION', 'utf-8').trim().replace('web/', '') || '0.0.0',
  },
};

export default withBundleAnalyzer(withNextIntl(config));
