import { useState } from 'react';
import { Text, Combobox } from '@mantine/core';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Locale, routing, usePathname, useRouter } from '@/lib/next-intl/routing';
import { ButtonSelect } from '../ButtonSelect';

const LOCALE_NAMES = {
  en: 'English',
  rs: 'Srpski',
} as const;

export function LocalePicker() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(useLocale() as Locale);
  return (
    <ButtonSelect
      position="bottom"
      autoClose
      width={100}
      title={LOCALE_NAMES[selected]}
      getItemId={(i) => i}
      items={[...routing.locales]}
      onSelect={(locale: Locale) => {
        setSelected(locale);
        router.replace(
          `${pathname}?${params?.toString() ?? ''}`,
          { locale }
        );
      }}
    >
      {routing.locales.map((locale) => (
        <Combobox.Option value={locale} key={locale}>
          <Text ta="center">{LOCALE_NAMES[locale]}</Text>
        </Combobox.Option>
      ))}
    </ButtonSelect>
  );
}
