import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as ReadonlyArray<string>).includes(locale)) {
    // Do not remove this validity check, otherwise there may be an exploit by importing arbitrary modules below!
    locale = routing.defaultLocale;
  }
  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    messages: await import(`./messages/${locale}.json`).then((mod) => mod.default),
  };
});
