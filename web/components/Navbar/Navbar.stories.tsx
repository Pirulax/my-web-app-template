import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@mantine/core';
import { Navbar } from './Navbar';
import { NavCollapsible } from './NavCollapsible';
import { NavItem } from './NavItem';
import { NavItemLabel } from './NavItemLabel';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '20rem' }}>
      <Stack gap="xs">
        <NavItem>
          <NavItemLabel label="Settings" />
        </NavItem>
        <NavItem>
          <NavItemLabel label="Profile" />
        </NavItem>
        <NavItem component={NavCollapsible} label={<NavItemLabel label="Settings" />}>
          <NavCollapsible label="Settings">
            <NavItem>
              <NavItemLabel label="Account" />
            </NavItem>
            <NavItem>
              <NavItemLabel label="Security" />
            </NavItem>
          </NavCollapsible>
        </NavItem>
        <NavItem>
          <NavItemLabel label="Help" />
        </NavItem>
      </Stack>
    </div>
  ),
};
