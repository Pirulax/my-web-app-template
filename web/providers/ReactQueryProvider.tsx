'use client';

import { getQueryClient } from '@/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export function ReactQueryProvider({ children }: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
