'use client';

import { IconLogout, IconUserFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Stack, Text } from '@mantine/core';
import { Translation } from '@/components/IntlText';
import { useSessionContext } from '@/lib/auth/providers/SessionProvider';
import { Link } from '@/lib/i18n/routing';
import { NavCollapsible } from '../NavCollapsible';
import { NavCollapsibleItem } from '../NavCollapsible/NavCollapsibleItem/NavCollapsibleItem';
import { NavItemLabel } from '../NavItemLabel';

export const NavUserDropdown = () => {
  const t = useTranslations('UserDropdown');
  const { user } = useSessionContext();
  return (
    <NavCollapsible
      withPadding
      label={
        <NavItemLabel
          icon={<IconUserFilled size={18} />}
          label={
            <Stack gap={0}>
              <Text c="dimmed" size="xs">
                {t('WelcomeUserMessage')},
              </Text>
              <Text size="sm" fw={500}>
                {user.name}
              </Text>
            </Stack>
          }
        />
      }
    >
      <NavCollapsibleItem component={Link} href="/settings">
        <NavItemLabel
          icon={<IconUserFilled size={18} />}
          label={<Translation id="Pages.Settings.Label" />}
        />
      </NavCollapsibleItem>
      {/* Must use `a` here to prevent client-side navigation, and instead do a full page re-render (See: https://southcla.ws/how-to-implement-logout-nextjs-cache-revalidate) */}
      <NavCollapsibleItem<'a'> component="a" href="/auth/logout">
        <NavItemLabel
          icon={<IconLogout size={18} />}
          label={<Translation id="Pages.Logout.Label" />}
        />
      </NavCollapsibleItem>
    </NavCollapsible>
  );
};
