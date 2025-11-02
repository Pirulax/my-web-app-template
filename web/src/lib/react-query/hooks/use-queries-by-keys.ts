import { useCallback, useMemo } from 'react';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

/**
 * @brief Custom hook to fetch multiple queries by their keys (usually IDs)
 * @param keys Array of IDs to query, it *can* contain duplicates - NOTE: Please make sure to memoize this array!
 * @returns A `Map` of Key -> Object mapping, and an overall loading state
 */
export const useQueriesByKeys = <
  TId,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>({
  keys,
  query,
}: {
  keys: TId[];
  query: (id: TId) => UseQueryOptions<TQueryFnData, TError, TData, any>;
}) => {
  const unique = useMemo(() => Array.from(new Set(keys)), [keys]);
  return useQueries({
    queries: unique.map((id) => query(id)),
    combine: useCallback(
      (qs) =>
        [
          qs.reduce((map, { data }, i) => {
            if (data !== undefined) {
              map.set(unique[i], data as TData);
            }
            return map;
          }, new Map<TId, TData>()),
          qs.some((q) => q.isLoading),
        ] as const,
      [unique]
    ),
  });
};
