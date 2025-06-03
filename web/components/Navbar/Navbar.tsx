import { Stack } from '@mantine/core';
import { LinksGroup } from '../LinksGroup/LinksGroup';

type Page = {
  icon: React.FC<any>;
  tkey: string;
  href: string;
};

type PageGroup = {
  icon: React.FC<any>;
  tkey: string;
  links: Page[];
};

export function Navbar(props : {
  pages: (Page | PageGroup)[];
}) {
  return (
    <>
      <div style={{flex: 1}}>
        <Stack justify="center" gap={0}>
          {props.pages.map((item) => (
            <LinksGroup {...item} key={item.tkey} />)
          )}
        </Stack>
      </div>
    </>
  );
}
