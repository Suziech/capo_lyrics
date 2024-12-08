"use client";

import { useState } from "react";
import Link from "next/link";
import songs from "@/data/songs.json";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  const [visibleGroups, setVisibleGroups] = useState<Record<string, boolean>>(
    {}
  );

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

  // 연관 검색어 생성
  const relatedSearches = songs
    .filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        searchTerm.trim() !== ""
    )
    .slice(0, 5) // 최대 5개의 연관 검색어 표시
    .map((song) => song.title);

  // 그룹 가시성 토글 함수
  const toggleGroupVisibility = (letter: string) => {
    setVisibleGroups((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>{title}</h1>

      {/* 검색 입력창 */}
      <div className='relative'>
        <input
          type='text'
          placeholder={description}
          className='w-full border border-gray-300 p-2 rounded my-4 text-black'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* 연관 검색어 드롭다운 */}
        {relatedSearches.length > 1 && (
          <ul className='absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded shadow-lg'>
            {relatedSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(search);
                  toggleGroupVisibility(search[0].toUpperCase());
                }}
                className='p-2 hover:bg-gray-100 cursor-pointer text-[#117554]'>
                {search}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 알파벳 그룹화된 리스트 */}
      {Object.keys(groupedSongs).length > 0 ? (
        Object.keys(groupedSongs)
          .sort()
          .map((letter) => (
            <div key={letter}>
              {/* 알파벳 헤더 */}
              <div
                className='flex items-center justify-between mt-4 cursor-pointer'
                onClick={() => toggleGroupVisibility(letter)}>
                <h2 className='text-xl font-bold text-[#8B5DFF]'>{letter}</h2>
                <button
                  onClick={() => toggleGroupVisibility(letter)}
                  className='text-sm text-[#FCCD2A] underline'>
                  {visibleGroups[letter] ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
              </div>
              {/* 노래 리스트 */}
              {visibleGroups[letter] && (
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
              )}
            </div>
          ))
      ) : (
        // 검색 결과 없을 때 메시지
        <p className='text-gray-500'>No songs found.</p>
      )}
    </div>
  );
}
