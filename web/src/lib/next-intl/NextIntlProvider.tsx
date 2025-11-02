import type { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const NextIntlProvider = async ({ children }: PropsWithChildren<{}>) => {
  /* May be worth caching `await getMessages()` in a top level variable in production? */
  return <NextIntlClientProvider messages={await getMessages()}>{children}</NextIntlClientProvider>;
};
