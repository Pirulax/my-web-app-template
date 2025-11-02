import { type ReactNode } from 'react';
import { Box, Group, ThemeIcon } from '@mantine/core';

export type NavItemLabelProps = {
  icon?: ReactNode;
  label: ReactNode;
};

export const NavItemLabel = ({ icon, label }: NavItemLabelProps) => (
  <Group justify="space-between" gap={0}>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      {icon && (
        <ThemeIcon variant="light" size={30}>
          {icon}
        </ThemeIcon>
      )}
      <Box ml="md">{label}</Box>
    </Box>
  </Group>
);
