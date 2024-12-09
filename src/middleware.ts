// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import {
  fallbackLng,
  locales,
  LocaleTypes,
} from "@/utils/localization/settings";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Extract user language from request headers
  const acceptLanguage = request.headers.get("accept-language") || "";
  const userLanguage = acceptLanguage.split(",")[0].split("-")[0]; // Get the base language, e.g., "en" from "en-US"

  // Determine the locale to use
  const detectedLocale = locales.includes(userLanguage as LocaleTypes)
    ? (userLanguage as LocaleTypes)
    : fallbackLng;

  // Redirect if locale is missing in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${detectedLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};
