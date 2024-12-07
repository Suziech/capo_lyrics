"use client";

import { useParams, usePathname } from "next/navigation";
import type { LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
// import { useTranslation } from "@/utils/localization/client";
import ChangeLocale from "./ChangeLocale";
import logo from "@/assets/images/logo_image.png";
import Image from "next/image";
// import ThemeChanger from "./ThemeChanger";

export default function Header() {
  const pathName = usePathname();
  const locale = useParams()?.locale as LocaleTypes;
  // const { t } = useTranslation(locale, "common");
  return (
    <header
      className={`flex items-center max-w-[1440px] mx-auto py-[20px] px-[16px]`}>
      <nav className={`flex justify-between w-full dark:text-red-500`}>
        <Link href={`/${locale}`}>
          {/* <b className='text-2xl'>Capo-Lyrics 🤸‍♀️</b> */}
          <Image src={logo} alt='logo' width={160} height={30} />
        </Link>
        <div className='flex items-center px-[10px]'>
          <Link
            href={`/${locale}/about`}
            className={
              pathName === `/${locale}/about` || pathName === "/about"
                ? "selected"
                : ""
            }>
            About
          </Link>
        </div>
      </nav>
      <ChangeLocale />
      {/* <ThemeChanger /> */}
    </header>
  );
}
