import type { Dispatch, SetStateAction } from 'react';
import { createSafeContext } from '@mantine/core';

export type NavCollapsibleContext = {
  /** Whether the NavItem is in a opened state */
  opened: boolean;
  /** Change opened state */
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const [NavCollapsibleContextProvider, useNavCollapsibleContext] =
  createSafeContext<NavCollapsibleContext>(
    '`NavCollapsibleContext` component was not found in tree'
  );
