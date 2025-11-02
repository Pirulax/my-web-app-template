import type { PropsWithChildren } from 'react';
import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import { theme } from './theme';

export const MantineProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
};
