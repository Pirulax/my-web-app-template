import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from '../NavItem';
import { NavItemLabel } from '../NavItemLabel';
import { NavCollapsible } from './NavCollapsible';
import type { NavCollapsibleProps } from './NavCollapsible';

const meta: Meta<typeof NavCollapsible> = {
  title: 'Navbar/NavCollapsible',
  component: NavCollapsible,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '20rem', height: '20rem', backgroundColor: '#4f0000ff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<NavCollapsibleProps>;

export const Default: Story = {
  render: (args) => (
    <NavItem component={NavCollapsible} {...args}>
      <div>Collapsible Content</div>
    </NavItem>
  ),
  args: {
    label: <NavItemLabel label="Folders" icon="📂" />,
  },
};

export const HiddenIfEmpty: Story = {
  render: (args) => <NavItem component={NavCollapsible} {...args} />,
  args: {
    label: <NavItemLabel label="Folders" icon="📂" />,
    hideIfEmpty: true,
  },
};

export const Nested: Story = {
  render: (args) => (
    <NavItem component={NavCollapsible} {...args} withPadding>
      <NavItem component={NavCollapsible} {...args}>
        <NavItem component={NavCollapsible} {...args}>
          <div>Collapsible Content</div>
        </NavItem>
      </NavItem>
      <NavItem component={NavCollapsible} {...args}>
        <NavItem component={NavCollapsible} {...args}>
          <div>Collapsible Content</div>
        </NavItem>
      </NavItem>
      <NavItem component={NavCollapsible} {...args}>
        <div>Collapsible Content</div>
      </NavItem>
      <NavItem component={NavCollapsible} {...args}>
        <div>Collapsible Content</div>
      </NavItem>
    </NavItem>
  ),
  args: {
    label: <NavItemLabel label="Folders" icon="📂" />,
  },
};

//export const OpenByDefault: Story = {
//  render: (args) => (
//    <NavItem component={NavCollapsible} {...args}>
//      <div>Expanded Content</div>
//    </NavItem>
//  ),
//  args: {
//    label: 'Open Menu',
//  },
//};
