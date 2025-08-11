"use client";

import songs from "@/data/songs.json";
import { useState, useEffect } from "react";

interface LyricItem {
  id: number;
  original: string;
  en: string;
  ko: string;
  ja: string;
  fr: string;
  chorus?: boolean;
}

export default function Lyrics({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const song = songs.find((item) => item.slug === slug);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!songs) {
    return <div>Song not found</div>;
  }

  return (
    <>
      {isLoading && (
        <div className='container mx-auto p-4 flex flex-col justify-center items-center pt-[120px]'>
          <iframe
            src={`https://www.youtube.com/embed/${song?.id}?loop=1&playlist=${song?.id}&modestbranding=1&fs=0&rel=0`}
            title='YouTube video player'
            allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; `}
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen></iframe>
          <h1 className='text-xl font-bold py-5'>{song?.title}</h1>
          <ul>
            {song?.lyrics.map((item: LyricItem) => (
              <li key={item.id}>
                <p className={`${item.chorus ? "text-[#FF7F3E]" : ""}`}>
                  {item.original}
                </p>
                {locale === "en" && <p className='text-gray-500'>{item.en}</p>}
                {locale === "ko" && <p className='text-gray-500'>{item.ko}</p>}
                {locale === "ja" && <p className='text-gray-500'>{item.ja}</p>}
                {locale === "fr" && <p className='text-gray-500'>{item.fr}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
