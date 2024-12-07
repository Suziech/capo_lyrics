"use client";

import songs from "@/data/songs";

export default function Lyrics({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  if (!songs) {
    return <div>Song not found</div>;
  }
  const song = songs.find((item) => item.slug === slug);
  return (
    <div className='container mx-auto p-4'>
      <iframe
        src={song?.youtubeLink}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen></iframe>
      <h1 className='text-2xl font-bold'>{song?.title}</h1>
      <ul>
        {song?.lyrics.map((item) => (
          <li key={item.original}>
            <p>{item.original}</p>
            {locale === "en" && <p>{item.en}</p>}
            {locale === "ko" && <p>{item.ko}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}