import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ColorSchemeScript, LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@/lib/mantine/MantineProvider';
import { NextIntlProvider } from '@/lib/next-intl/NextIntlProvider';
import { makeQueryClient } from '@/lib/react-query/make-query-client';
import { ReactQueryProvider } from '@/lib/react-query/ReactQueryProvider';

const { GOOGLE_ANALYTICS_ID } = process.env;

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider>
          <NextIntlProvider>
            <ReactQueryProvider client={makeQueryClient()}>
              <Notifications position="top-center" />
              <NuqsAdapter>
                <Suspense
                  fallback={
                    // Suspense boundary should be as deep as possible (As state of children is lost when suspending)
                    <LoadingOverlay visible w="100vw" h="100vh" />
                  }
                >
                  {children}
                </Suspense>
              </NuqsAdapter>
            </ReactQueryProvider>
          </NextIntlProvider>
        </MantineProvider>
      </body>
      {GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics
          gaId={GOOGLE_ANALYTICS_ID}
          debugMode={process.env.NODE_ENV === 'development'}
        />
      )}
    </html>
  );
}
