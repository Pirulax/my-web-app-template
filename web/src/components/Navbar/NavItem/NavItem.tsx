'use client';

import { forwardRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { Box, createPolymorphicComponent, type BoxProps } from '@mantine/core';
import common from '../common.module.css';

export interface NavItemProps extends BoxProps {
  /** Children, usually a `NavItemLabel` */
  children: ReactNode;
}

export const NavItem = createPolymorphicComponent<'span', NavItemProps>(
  forwardRef<HTMLSpanElement, NavItemProps>(({ ...props }, ref) => (
    <Box component="span" {...props} ref={ref} className={clsx(props.className, common.control)}>
      {props.children}
    </Box>
  ))
);
