'use client';

import { forwardRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { Box, createPolymorphicComponent, type BoxProps } from '@mantine/core';
import classes from './NavCollapsibleItem.module.css';

export interface NavCollapsibleItemProps extends BoxProps {
  children?: ReactNode;
}

export const NavCollapsibleItem = createPolymorphicComponent<'span', NavCollapsibleItemProps>(
  forwardRef<HTMLSpanElement, NavCollapsibleItemProps>(({ children, ...props }, ref) => (
    <Box
      component="span"
      {...props}
      ref={ref}
      className={clsx(props.className, classes['collapsible-item'])}
    >
      {children}
    </Box>
  ))
);
