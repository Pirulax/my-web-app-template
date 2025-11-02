'use client';

import type { ElementProps } from '@mantine/core';
import type { NavItemProps } from '../NavItem';
import { NavItem } from '../NavItem';
import { Link } from '@/i18n/routing';

export interface NavLinkProps extends Omit<ElementProps<typeof Link>, 'children'>, NavItemProps {}

export const NavLink = (props: NavLinkProps) => (
  <NavItem style={{ ...props.style, textDecoration: 'none' }} component={Link} {...props} />
);
