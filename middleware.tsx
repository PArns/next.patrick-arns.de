import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import PageBaseConfiguration from "./configuration";

function getLocale(request: NextRequest, config: any) {
  try {
    const acceptedLanguage =
      request.headers.get("accept-language") ?? undefined;
    const headers = { "accept-language": acceptedLanguage };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, config.supportedLocales, config.defaultLocale);
  } catch {
    return config.defaultLocale;
  }
}

function cleanPathname(pathname: string): string {
  if (pathname === "/") return "/";
  return `/${pathname.replace(/^\/|\/$/g, "")}`;
}

export function middleware(request: NextRequest) {
  const config = PageBaseConfiguration();
  const pathname = cleanPathname(request.nextUrl.pathname);

  // Default redirects
  if (config.redirects) {
    const redirect = Object.entries(config.redirects).find(([source]) => {
      if (source.endsWith("/*")) {
        const base = source.slice(0, -2);
        return pathname.startsWith(base + "/");
      }
      return source === pathname;
    });
  
    if (redirect) {
      const locale = getLocale(request, config);
      let [source, destination] = redirect;
  
      if (source.endsWith("/*")) {
        const base = source.slice(0, -2);
        const wildcard = pathname.slice(base.length); // z.B. /blog/foo → /foo
        destination = destination.replace("*", wildcard.replace(/^\//, ""));
      }
  
      if (destination.includes("{lng}")) {
        destination = destination.replace("{lng}", locale);
      }
  
      return NextResponse.redirect(new URL(destination, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|appicons|backgrounds|favicons|flags|images|jumbotron|assets|de/|en/).*)",
  ],
};
