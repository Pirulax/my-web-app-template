import createNextIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from "next/server";
import { routing } from "./lib/next-intl/routing";

const i18nMiddleware = createNextIntlMiddleware(routing);

export default async (req: NextRequest) => {
  return i18nMiddleware(req);
};

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};
