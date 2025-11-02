import createNextIntlMiddleware from 'next-intl/middleware';
import { NextRequest, ProxyConfig } from "next/server";
import { routing } from "./lib/next-intl/routing";

const i18nMiddleware = createNextIntlMiddleware(routing);

export default async (req: NextRequest) => {
  return i18nMiddleware(req);
};

export const config: ProxyConfig = {
  matcher: ['/((?!_next/|api[/|\\w+]*|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};
