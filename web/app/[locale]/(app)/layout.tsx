'use client';

import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { ZIndex } from "@/zindex";
import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome2 } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

const PAGES = [
  {
    icon: IconHome2,
    tkey: 'Pages.Home',
    href: '/',
  },
];

export default ({ children }: PropsWithChildren<{}>) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: { base: 45 } }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
    >
      <AppShellHeader zIndex={ZIndex.HEADER}>
        <Header withNav isNavOpen={opened} onNavToggle={toggle} />
      </AppShellHeader>
      <AppShellNavbar zIndex={ZIndex.NAVBAR}>
        <Navbar pages={PAGES} />
      </AppShellNavbar>
      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  )
};
