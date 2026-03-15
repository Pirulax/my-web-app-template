'use client';

import * as luxon from '@/lib/luxon';
import type { Locale } from '@/lib/next-intl/routing';
import { getLanguageCodeOfLocale } from '@/lib/next-intl/utility';

export type LuxonSettingsHandlerProps = {
  locale: Locale;
};

export const LuxonSettingsHandler = ({ locale }: LuxonSettingsHandlerProps) => {
  /**
   * Initialize Luxon with the correct locale as early as possible,
   * to ensure that all date formatting uses the correct locale from the start
   **/
  luxon.Settings.defaultLocale = getLanguageCodeOfLocale(locale);

  /**
   * Initialize default timezone to use
   * TODO: Add user-specific timezone support in the future, but for now we can just set a default timezone for all users
   **/
  luxon.Settings.defaultZone = 'Europe/Belgrade';

  /**
   * Throw for invalid DateTimes, Durations, or Intervals to catch errors early.
   **/
  luxon.Settings.throwOnInvalid = true;

  return null;
};
