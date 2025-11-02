import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@/lib/mantine/MantineProvider';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>{children}</MantineProvider>
    ),
  });
}
