import type { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Locale } from './routing';

export type NextIntlProviderProps = PropsWithChildren<{
  /** Optional overwrite for the locale */
  locale?: Locale;
}>;

export const NextIntlProvider = async ({ children, locale }: NextIntlProviderProps) => {
  /* May be worth caching `await getMessages()` in a top level variable in production? */
  return (
    <NextIntlClientProvider messages={await getMessages({ locale })}>
      {children}
    </NextIntlClientProvider>
  );
};
