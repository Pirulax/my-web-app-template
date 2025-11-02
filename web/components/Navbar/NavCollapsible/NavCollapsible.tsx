'use client';

import type { PropsWithChildren } from 'react';
import React, { useMemo, useState, type ReactNode } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import { Box, Collapse, Container, Flex, rem, Stack, UnstyledButton } from '@mantine/core';
import { NavCollapsibleContextProvider } from './NavCollapsibleContext';
import common from '../common.module.css';
import classes from './NavCollapsible.module.css';

export type NavCollapsibleProps = PropsWithChildren<{
  /** Label to display (can be anything), usually a `<IntlText />` wrapped into `<NavItemGroupLabel>` */
  label: ReactNode;
  /** Children to be in the collapsible */
  children: ReactNode;
  /** Is it opened by default [Default: false] */
  defaultOpened?: boolean;
  /** Add padding [Default: false] */
  withPadding?: boolean;
  /** Hide if empty [Default: true] */
  hideIfEmpty?: boolean;
}>;

export const NavCollapsible = ({
  children,
  label,
  defaultOpened,
  withPadding,
  hideIfEmpty,
}: NavCollapsibleProps) => {
  const [opened, setOpened] = useState(defaultOpened ?? false);
  return (
    <NavCollapsibleContextProvider
      value={useMemo(
        () => ({
          opened,
          setOpened,
        }),
        [opened]
      )}
    >
      <div data-hide-if-empty={hideIfEmpty} className={classes.container}>
        {/* Clickable button for the collapsible */}
        <UnstyledButton onClick={() => setOpened((o) => !o)} component={Stack} gap={0}>
          <Flex
            className={clsx(common.control)}
            flex={1}
            direction="row"
            p={withPadding ? 'xs' : 0}
          >
            <Flex>{label}</Flex>
            <Flex ml="auto">
              {/* Add `pr` to account for (possibly) parent collapsible's padding */}
              <Flex direction="column" justify="center" display="flex" pr={withPadding ? 0 : 'xs'}>
                <IconChevronRight
                  stroke={1.5}
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transform: opened ? 'rotate(-90deg)' : 'none',
                    transition: 'transform 200ms ease',
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </UnstyledButton>
        {/* Items collapsible container  */}
        <Box pl={withPadding ? 'xs' : 0}>
          <Collapse in={opened}>
            <Stack gap={0} className={classes.collapse}>
              {children}
            </Stack>
          </Collapse>
        </Box>
      </div>
    </NavCollapsibleContextProvider>
  );
};
