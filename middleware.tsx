import { NextResponse, type NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import PageBaseConfiguration from "./configuration";

function getLocale(request: NextRequest) {
  const config = PageBaseConfiguration();

  try {
    const acceptedLanguage =
      request.headers.get("accept-language") ?? undefined;
    let headers = { "accept-language": acceptedLanguage };
    let languages = new Negotiator({ headers }).languages();

    return match(languages, config.supportedLocales, config.defaultLocale);
  } catch {
    return config.defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  const config = PageBaseConfiguration();
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = config.supportedLocales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathname === "/" && config.startRoute && config.startRoute !== "/") {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}/${config.startRoute}`.replaceAll("//", "/"),
        request.url,
      ),
    );
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|appicons|favicons|flags|images|jumbotron|assets|de/|en/).*)",
  ],
};
