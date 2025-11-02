import en from '../src/lib/next-intl/messages/en.json';
import rs from '../src/lib/next-intl/messages/rs.json';

const messagesByLocale: Record<string, any> = {en, rs};

const nextIntl= {
  defaultLocale: 'rs',
  messagesByLocale,
  getMessageFallback: ({namespace, key}) => `${namespace}.${key}`,
};

export default nextIntl;
