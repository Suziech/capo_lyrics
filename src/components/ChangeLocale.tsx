"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

export default function ChangeLocale() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: string) => {
    const updatedSegments = urlSegments.filter(
      (segment) => segment !== params.locale
    );
    router.push(`/${newLocale}/${updatedSegments.join("/")}`);
    setIsOpen(false); // 메뉴 선택 후 닫기
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='px-4 relative cursor-pointer' ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <IoLanguage size={24} className='text-white' />
      </div>
      {isOpen && (
        <div className='absolute top-10 right-0 bg-white border rounded-md w-[110px] text-black p-1 z-10'>
          <div
            onClick={() => handleLocaleChange("en")}
            className='p-2 whitespace-nowrap'>
            🇬🇧 English
          </div>
          <div className='border-t'></div>
          <div
            onClick={() => handleLocaleChange("ko")}
            className='p-2 whitespace-nowrap'>
            🇰🇷 한국어
          </div>
          <div className='border-t'></div>
          <div
            onClick={() => handleLocaleChange("ja")}
            className='p-2 whitespace-nowrap'>
            🇯🇵 日本語
          </div>
          <div className='border-t'></div>
          <div
            onClick={() => handleLocaleChange("fr")}
            className='p-2 whitespace-nowrap'>
            🇫🇷 Français
          </div>
        </div>
      )}
    </div>
  );
}
