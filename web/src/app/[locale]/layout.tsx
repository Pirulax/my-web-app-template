import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { BasicLayout } from '@/components/BasicLayout';
import type { Locale } from '@/lib/next-intl/routing';

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  return <BasicLayout locale={locale as Locale}>{children}</BasicLayout>;
}
