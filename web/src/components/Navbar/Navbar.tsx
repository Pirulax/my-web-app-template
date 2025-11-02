'use client';

import { IconHome2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { NavItemLabel } from './NavItemLabel';
import { NavLink } from './NavLink/NavLink';

export type NavbarProps = {};

export const Navbar = (props: NavbarProps) => {
  const t = useTranslations();
  return (
    <>
      <NavLink p="xs" href="/">
        <NavItemLabel icon={<IconHome2 size={18} />} label={t('Pages.Home.Label')} />
      </NavLink>
    </>
  );
};
