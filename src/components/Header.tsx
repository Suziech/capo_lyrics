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
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 빠르게 스크롤 올릴 때도 헤더가 사라지지 않도록 딜레이 적용
      if (currentScrollY < lastScrollY - 10) {
        setIsScrollingUp(true);
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsScrollingUp(false);
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);

      // 모바일에서의 스크롤 딜레이 해결 (스크롤 이벤트 최적화)
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowHeader(true);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full flex justify-center ${
        showHeader ? "top-[0px]" : "-top-[80px]"
      } transition-all duration-300 ease-in-out fixed z-[9999] ${
        isScrollingUp ? "bg-opacity-100" : "bg-opacity-50"
      }`}>
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
