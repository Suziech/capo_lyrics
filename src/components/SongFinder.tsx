"use client";

import { useState } from "react";
import Link from "next/link";
import songs from "@/data/songs.json";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

type Song = {
  id: string;
  title: string;
  slug: string;
};

export default function SongFinder({
  locale,
  title,
  description,
  notFound,
}: {
  locale: string;
  title: string;
  description: string;
  notFound: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // 그룹핑된 노래
  const filteredSongs = songs
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const groupedSongs = filteredSongs.reduce(
    (groups: Record<string, Song[]>, song) => {
      const firstLetter = song.title[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(song);
      return groups;
    },
    {}
  );

  // 초기 상태를 모든 그룹 열림으로 설정
  const [visibleGroups, setVisibleGroups] = useState<Record<string, boolean>>(
    Object.keys(groupedSongs).reduce(
      (acc, letter) => ({ ...acc, [letter]: true }),
      {}
    )
  );

  const relatedSearches = songs
    .filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        searchTerm.trim() !== ""
    )
    .slice(0, 5)
    .map((song) => song.title);

  const toggleGroupVisibility = (letter: string) => {
    setVisibleGroups((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  return (
    <div className='container mx-auto px-4 pt-[120px]'>
      <h1 className='text-2xl font-bold'>{title}</h1>

      {/* 검색 입력창 */}
      <div className='relative z-0'>
        <input
          type='text'
          placeholder={description}
          className='w-full border border-gray-300 p-2 rounded my-4 text-black pr-10 z-0'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* X 버튼 */}
        {searchTerm && (
          <button
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800'
            onClick={() => setSearchTerm("")}>
            <IoClose size={20} />
          </button>
        )}
        {relatedSearches.length > 1 && (
          <ul className='absolute z-10 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded shadow-lg'>
            {relatedSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(search);
                }}
                className='p-2 hover:bg-gray-100 cursor-pointer text-[#117554]'>
                {search}
              </li>
            ))}
          </ul>
        )}
      </div>

      {Object.keys(groupedSongs).length > 0 ? (
        Object.keys(groupedSongs)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <div
                className='flex items-center justify-between mt-4 cursor-pointer'
                onClick={() => toggleGroupVisibility(letter)}>
                <h2 className='text-xl font-bold text-[#8B5DFF]'>{letter}</h2>
                <button className='text-sm text-[#FCCD2A] underline'>
                  {visibleGroups[letter] ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
              </div>
              {visibleGroups[letter] && (
                <ul>
                  {groupedSongs[letter].map((song) => (
                    <li
                      key={song.id}
                      className='py-2 text-[14px] border-b-[0.1px] border-[#8B5DFF] rounded-md m-2 px-2 flex'>
                      <Image
                        src={`https://img.youtube.com/vi/${song.id}/0.jpg`}
                        alt='image'
                        width={40}
                        height={30}
                        className='mr-3'
                      />
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
        <p className='text-gray-500'>{notFound}</p>
      )}
    </div>
  );
}
