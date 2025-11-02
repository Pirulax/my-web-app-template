'use client';

import { Burger, Flex, Group } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle';
import { LocalePicker } from '../LocalePicker';

type HeaderProps = {
  withNav: false;
} | {
  withNav: true;
  isNavOpen: boolean;
  onNavToggle: () => void
};

export const Header = (props: HeaderProps) => {
  return (
    <Flex direction="row" justify="space-between">
      <Flex justify="flex-start" align="center" px={10}>
        {props.withNav && <Burger
          opened={props.isNavOpen}
          onClick={props.onNavToggle}
          size="md"
          aria-label="Toggle Navigation"
        />}
      </Flex>
      <Group grow justify="flex-end">
        <LocalePicker />
        <ColorSchemeToggle />
      </Group>
    </Flex>
  );
}
