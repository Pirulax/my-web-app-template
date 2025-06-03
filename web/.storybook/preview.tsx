import '@mantine/core/styles.css';

import React, { useEffect } from 'react';
import { addons } from 'storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode2';
import { MantineProvider, useMantineColorScheme } from '@mantine/core';
import { theme } from '../theme';
import nextIntl from './next-intl';
import { Preview } from '@storybook/nextjs';

const preview: Preview = {
    initialGlobals: {
        locale: 'en',
        locales: {
            en: 'English',
            rs: 'Srpski',
        },
    },
    parameters: {
      nextIntl,
    },
};
export default preview;

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
  },
};

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
];
