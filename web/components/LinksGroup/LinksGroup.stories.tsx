import type { Meta, StoryObj } from '@storybook/react';


import { IconHome2, IconKey, IconSearch, IconUser } from '@tabler/icons-react';
import { LinksGroup } from './LinksGroup';

export const ActionsData = { };

const meta = {
  component: LinksGroup,
  title: 'LinksGroup',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof LinksGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    icon: IconHome2,
    tkey: 'Pages.Home',
    href: '/'
  },
};

export const Multiple: Story = {
  args: {
    icon: IconSearch,
    tkey: 'Pages.Search',
    links: [
      {
        tkey: 'By-User',
        href: '/',
        icon: IconUser,
      },
      {
        tkey: 'By-Key',
        href: '/task',
        icon: IconKey,
      },
    ],
  },
};
