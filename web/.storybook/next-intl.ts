import en from '../messages/en.json';
import rs from '../messages/rs.json';

const messagesByLocale: Record<string, any> = {en, rs};

const nextIntl= {
  defaultLocale: 'rs',
  messagesByLocale,
  getMessageFallback: ({namespace, key}) => `${namespace}.${key}`,
};

export default nextIntl;
