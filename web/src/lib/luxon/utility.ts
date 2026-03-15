import type { DateTimeFormatOptions } from '@/lib/luxon';
import { DateTime, Duration } from '@/lib/luxon';
import type { Locale } from '@/lib/next-intl/routing';
import { getLanguageCodeOfLocale } from '@/lib/next-intl/utility';

export const formatDateTime = (
  datetimeToFormat: DateTime,
  config?: {
    /** Timezone to use (Defaults to `TIMEZONE` for now) */
    timezone?: string;
    /** Locale to use () */
    locale?: Locale;
    omitYearIfCurrent?: boolean;
    format?: DateTimeFormatOptions;
  }
) => {
  let dt = datetimeToFormat;
  if (config?.timezone) {
    dt = dt.setZone(config.timezone);
  }
  if (config?.locale) {
    dt = dt.setLocale(getLanguageCodeOfLocale(config.locale));
  }
  const now = DateTime.now().setZone(config?.timezone);
  const format = config?.format ?? {};
  if (config?.omitYearIfCurrent && dt.year === now.year) {
    delete format.year;
  }
  return dt.toLocaleString({
    ...format,
  });
};

// https://github.com/moment/luxon/issues/1134#issue-1128331010
const units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'] as const;
export function duration2human(
  dur: Duration,
  smallestUnit: (typeof units)[number] = 'seconds'
): string {
  const smallestIdx = units.indexOf(smallestUnit);
  const entries = Object.entries(
    dur
      .shiftTo(...units)
      .normalize()
      .toObject()
  ).filter(([_unit, amount], idx) => amount > 0 && idx <= smallestIdx);
  const dur2 = Duration.fromObject(
    entries.length === 0 ? { [smallestUnit]: 0 } : Object.fromEntries(entries)
  );
  return dur2.toHuman();
}
