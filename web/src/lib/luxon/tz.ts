import { DateTime } from '@/lib/luxon';

export const TIMEZONE = 'Europe/Belgrade';

export const getLocalNow = () => {
  return DateTime.now().setZone(TIMEZONE);
};
