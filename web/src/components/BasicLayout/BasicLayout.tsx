import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { PropsWithChildren } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ColorSchemeScript } from '@mantine/core';
import { env } from '@/env';
import { LuxonSettingsHandler } from '@/lib/luxon/LuxonSettingsHandler';
import { MantineProvider } from '@/lib/mantine/MantineProvider';
import { NextIntlProvider } from '@/lib/next-intl/NextIntlProvider';
import type { Locale } from '@/lib/next-intl/routing';

export type BasicLayoutProps = PropsWithChildren & {
  locale: Locale;
};

export const BasicLayout = ({ children, locale }: BasicLayoutProps) => (
  <html lang={locale} suppressHydrationWarning>
    <head>
      <ColorSchemeScript defaultColorScheme="light" />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <LuxonSettingsHandler locale={locale} />
    </head>
    <body>
      <MantineProvider>
        <NextIntlProvider locale={locale}>{children}</NextIntlProvider>
      </MantineProvider>
    </body>
    {env.NEXT_PUBLIC_GA_ID && (
      <GoogleAnalytics
        gaId={env.NEXT_PUBLIC_GA_ID}
        debugMode={process.env.NODE_ENV === 'development'}
      />
    )}
  </html>
);
