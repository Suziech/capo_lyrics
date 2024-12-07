"use client";

import { useParams, usePathname } from "next/navigation";
import type { LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { useTranslation } from "@/utils/localization/client";
import ChangeLocale from "./ChangeLocale";
import ThemeChanger from "./ThemeChanger";

export default function Header() {
  const pathName = usePathname();
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  return (
    <header className={`flex`}>
      <nav className={`flex justify-between w-full dark:text-red-500`}>
        <Link href={`/${locale}`}>
          <b>GingaTunes 🤸‍♀️</b>
        </Link>
        <div>
          {" "}
          <Link
            href={`/${locale}`}
            className={
              pathName === `/${locale}` || pathName === "/" ? "selected" : ""
            }>
            {t("home")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className={
              pathName === `/${locale}/about` || pathName === "/about"
                ? "selected"
                : ""
            }>
            {t("about")}
          </Link>
        </div>
      </nav>
      <ChangeLocale />
      <ThemeChanger />
    </header>
  );
}
