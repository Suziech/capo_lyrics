"use client";

import { useState } from "react";
import Link from "next/link";
import songs from "@/data/songs.json";

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
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* 필터링된 리스트 */}
      <ul>
        {filteredSongs.map((song) => (
          <li key={song.id} className={`py-2 text-lg`}>
            <Link href={`/${locale}/${song.slug}`}>
              <div className='cursor-pointer hover:text-blue-500'>
                {song.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 검색 결과 없을 때 메시지 */}
      {filteredSongs.length === 0 && (
        <p className='text-gray-500'>No songs found.</p>
      )}
    </div>
  );
}
