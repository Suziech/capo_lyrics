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
      className={`flex items-center max-w-[1440px] mx-auto py-[20px] px-[16px] fixed w-full bg-[#FFC436] z-[9999]`}>
      <nav className={`flex justify-between w-full `}>
        <Link href={`/${locale}`}>
          <Image src={logo} alt='logo' width={160} height={30} />
        </Link>
        <div className='flex items-center px-[10px] text-[#00712D]'>
          <Link
            href={`/${locale}/about`}
            className={
              pathName === `/${locale}/about` || pathName === "/about"
                ? "selected font-bold"
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
