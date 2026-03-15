import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * IN CASE OF ERRORS (WHEN ADDING NEW ENV VARS):
 * 1. CHECK DOCKER COMPOSE
 */
export const env = createEnv({
  server: {},
  client: {
    /**
     * Build date as ISO string
     **/
    NEXT_PUBLIC_BUILD_DATE: z.coerce.date(),

    /**
     * App version
     **/
    NEXT_PUBLIC_VERSION: z.string(),

    /**
     * Google Analytics ID
     **/
    NEXT_PUBLIC_GA_ID: z.string().startsWith('GA').optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BUILD_DATE: process.env.NEXT_PUBLIC_BUILD_DATE,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION,
  },
  emptyStringAsUndefined: true,
});
