import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query';
import SuperJSON from 'superjson';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        throwOnError: true,
        retry: 1,
      },
      mutations: {
        throwOnError: false,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        // include pending queries in dehydration (See https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components)
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        shouldRedactErrors: (error) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
}
