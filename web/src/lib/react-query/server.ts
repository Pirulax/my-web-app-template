import 'server-only';

import { cache } from 'react';
import { makeQueryClient } from './make-query-client';

/**
 * @brief Create a stable getter for the query client that will return the same client during the same request.
 **/
export const getServerQueryClient = cache(makeQueryClient);
