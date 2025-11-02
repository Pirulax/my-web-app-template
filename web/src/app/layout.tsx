import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { theme } from '@/theme';
import { ColorSchemeScript, LoadingOverlay, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren, Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google'

const { GOOGLE_ANALYTICS_ID } = process.env;

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ locale: string }>
}>) {
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
        <MantineProvider theme={theme} defaultColorScheme="light">   
          <NextIntlClientProvider messages={await getMessages()}> {/* May be worth caching this in a top level variable in production? */}
            <ReactQueryProvider>
              <Notifications position="top-center" />
              <NuqsAdapter>
                <Suspense fallback={ // Suspense boundary should be as deep as possible (As state of children is lost when suspending)
                  <LoadingOverlay
                    visible
                    w="100vw"
                    h="100vh"
                  />
                }>
                  {children}
                </Suspense>
              </NuqsAdapter>
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} debugMode={process.env.NODE_ENV === 'development'} />}
    </html>
  );
}
