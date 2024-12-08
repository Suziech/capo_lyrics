"use client";

import { useState } from "react";
import Link from "next/link";
import songs from "@/data/songs.json";

type Song = {
  id: number;
  title: string;
  slug: string;
};

export default function SongFinder({
  locale,
  title,
  description,
}: {
  locale: string;
  title: string;
  description: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어에 따라 필터링된 노래 리스트 생성
  const filteredSongs = songs
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // 알파벳 그룹화
  const groupedSongs = filteredSongs.reduce(
    (groups: Record<string, Song[]>, song) => {
      const firstLetter = song.title[0].toUpperCase(); // 첫 글자 가져오기
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(song);
      return groups;
    },
    {}
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>

      {/* 검색 입력창 */}
      <input
        type='text'
        placeholder={description}
        className='w-full border border-gray-300 p-2 rounded my-4 text-black'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 알파벳 그룹화된 리스트 */}
      {Object.keys(groupedSongs).length > 0 ? (
        Object.keys(groupedSongs)
          .sort()
          .map((letter) => (
            <div key={letter}>
              {/* 알파벳 헤더 */}
              <h2 className='text-xl font-bold mt-4 text-[#8B5DFF]'>
                {letter}
              </h2>
              <ul>
                {groupedSongs[letter].map((song) => (
                  <li key={song.id} className={`py-2 text-lg`}>
                    <Link href={`/${locale}/${song.slug}`}>
                      <div className='cursor-pointer hover:text-blue-500'>
                        {song.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
      ) : (
        // 검색 결과 없을 때 메시지
        <p className='text-gray-500'>No songs found.</p>
      )}
    </div>
  );
}
