"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { useState } from "react";

export default function ChangeLocale() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    const updatedSegments = urlSegments.filter(
      (segment) => segment !== params.locale
    );
    router.push(`/${newLocale}/${updatedSegments.join("/")}`);
  };

  return (
    <div
      className='px-4 relative cursor-pointer'
      onClick={() => setIsOpen(!isOpen)}>
      <IoLanguage size={24} />
      {isOpen && (
        <div className='absolute top-10 right-0 bg-white border rounded-md w-[110px] text-black p-1'>
          <div onClick={() => handleLocaleChange("en")} className='p-2'>
            🇬🇧 English
          </div>
          <div className='border-t'></div>
          <div onClick={() => handleLocaleChange("ko")} className='p-2'>
            🇰🇷 한국어
          </div>
          <div className='border-t'></div>
          <div onClick={() => handleLocaleChange("ja")} className='p-2'>
            🇯🇵 日本語
          </div>
        </div>
      )}
    </div>
  );
}
