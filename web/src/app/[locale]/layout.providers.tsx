'use client';

import { useState, type PropsWithChildren } from 'react';
import { makeQueryClient } from '@/lib/react-query/make-query-client';
import { ReactQueryProvider } from '@/lib/react-query/ReactQueryProvider';

export const LayoutProviders = ({ children }: PropsWithChildren) => {
  const [qc] = useState(makeQueryClient());
  return <ReactQueryProvider client={qc}>{children}</ReactQueryProvider>;
};
