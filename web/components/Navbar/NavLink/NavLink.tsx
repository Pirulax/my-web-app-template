'use client';

import type { ElementProps } from '@mantine/core';
import { Link } from '@/lib/i18n/routing';
import type { NavItemProps } from '../NavItem';
import { NavItem } from '../NavItem';

export interface NavLinkProps extends Omit<ElementProps<typeof Link>, 'children'>, NavItemProps {}

export const NavLink = (props: NavLinkProps) => (
  <NavItem style={{ ...props.style, textDecoration: 'none' }} component={Link} {...props} />
);
