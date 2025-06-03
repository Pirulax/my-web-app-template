'use client';

import cx from 'clsx';
import {
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  UnstyledButton,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <UnstyledButton
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="md"
        aria-label="Toggle color scheme"
        m={10}
      >
        <IconMoon className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconSun className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </UnstyledButton>
    </Group>
  );
}
