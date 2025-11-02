import type { QueryClientProviderProps } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export type ReactQueryProviderProps = QueryClientProviderProps;

export const ReactQueryProvider = ({ children, client }: ReactQueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
