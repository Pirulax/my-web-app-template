'use client';

import { JSX, ReactNode } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { XOR } from 'ts-xor';
import { Box, Collapse, Flex, Group, rem, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link as NextLink, usePathname } from '@/i18n/routing';
import classes from './LinksGroup.module.css';


interface LinksGroupBaseProps {
  icon?: JSX.ElementType;
  tkey: string;
  label?: ReactNode; //!< If provided, this will be used instead of the label from translations
};

/** Menu item that is a direct link (So no children) */
type DirectLinkProps = LinksGroupBaseProps & {
  href: string;
};

/** Menu item that has links in it  */
type CollapsibleGroupProps = LinksGroupBaseProps & {
  links: GroupLinkProps[];
};

export type LinksGroupProps = XOR<DirectLinkProps, CollapsibleGroupProps>;

/** Group link props */
type GroupLinkProps = {
  tkey: string,
  href: string,
  icon?: JSX.ElementType
};

/** Group label */
const Label = ({
  icon: Icon,
  label
}: Pick<LinksGroupProps, 'icon'> & { label: ReactNode; }) => (
  <Group justify="space-between" gap={0}>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <ThemeIcon variant="light" size={30}>
        {Icon && <Icon style={{ width: rem(18), height: rem(18) }} />}
      </ThemeIcon>
      <Box ml="md">{label}</Box>
    </Box>
  </Group>
);

export const LinksGroup = ({ icon: Icon, tkey, links, href, ...props }: LinksGroupProps) => {
  const t = useTranslations(tkey);

  const pathname = usePathname();
  const isOnPage = (pgpath : string) =>
    pgpath === pathname;
  
  const LabelNode = <Label label={props.label ?? t('Label')} icon={Icon} />;

  /** No children, act as direct link */
  if (!links) {
    return (
      <UnstyledButton
        component={NextLink}
        href={href}
        className={classes.control}
      >
        {LabelNode}
      </UnstyledButton>
    );
  }

  /** Actual group, act as a collapsible menu (That is open if any of it's links is open) */
  const [opened, { toggle: toggleOpen }] = useDisclosure(
    links.find((l) => isOnPage(l.href)) !== undefined
  );
  return (
    <>
      <UnstyledButton
        onClick={toggleOpen}
        className={classes.control}
      >
        <Flex justify='space-between' align='center'>
          {LabelNode}
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? 'rotate(-90deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
        </Flex>
      </UnstyledButton>
      <Collapse in={opened}>
        {links.map((link, key) => (
          <NextLink
            key={key}
            className={classes.link}
            href={link.href}
          >
            {link.icon && <link.icon />}
            <Text px={8}>{t(`${link.tkey}.Label`)}</Text>
          </NextLink>
        ))}
      </Collapse>
    </>
  );
};
