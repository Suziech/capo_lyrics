"use client";

import { useState, useEffect } from "react";
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

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // 스크롤을 내릴 때 헤더 숨김
      } else {
        setShowHeader(true); // 스크롤을 올릴 때 헤더 표시
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full flex justify-center ${
        showHeader ? "top-0" : "-top-[80px]"
      } transition-all duration-300 ease-in-out fixed z-[9999]`}>
      {" "}
      <header
        className={`flex items-center max-w-[1440px] mx-auto py-[20px] px-[16px] fixed w-full bg-[#000] z-[9999]`}>
        <nav className={`flex justify-between w-full `}>
          <Link href={`/${locale}`}>
            <Image src={logo} alt='logo' width={160} height={30} />
          </Link>
          <div className='flex items-center px-[10px] text-white'>
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
    </div>
  );
}
