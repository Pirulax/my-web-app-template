'use client';

import { IconHome2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Divider, Flex, Text } from '@mantine/core';
import { env } from '@/env';
import { DateTime } from '@/lib/luxon';
import { NavItemLabel } from './NavItemLabel';
import { NavLink } from './NavLink/NavLink';

export type NavbarProps = {};

export const Navbar = (_props: NavbarProps) => {
  const t = useTranslations();
  return (
    <>
      <NavLink p="xs" href="/">
        <NavItemLabel icon={<IconHome2 size={18} />} label={t('Pages.Home.Label')} />
      </NavLink>

      <Flex flex={1} justify="end" direction="column">
        <Divider />
        <Text size="sm" c="dimmed" ta="center">
          {env.NEXT_PUBLIC_VERSION}
          {' @ '}
          {DateTime.fromJSDate(env.NEXT_PUBLIC_BUILD_DATE).toUTC().toFormat('yyyy-MM-dd HH:mm')} UTC
        </Text>
      </Flex>
    </>
  );
};
