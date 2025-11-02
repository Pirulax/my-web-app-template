'use client';

import { createTheme, Popover } from '@mantine/core';

export const theme = createTheme({
  components: {
    Popover: Popover.extend({
      defaultProps: {
        hideDetached: false, // Temporary fix for @mantine#7947 (https://github.com/mantinedev/mantine/issues/7947)
      },
    }),
  },
});
