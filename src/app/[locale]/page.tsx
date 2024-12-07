import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import songs from "@/data/songs";

export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "home");

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Capoeira Song Finder 🔍</h1>
      <input
        type='text'
        placeholder='Search for a song...'
        className='w-full border border-gray-300 p-2 rounded my-4'
      />
      <ul>
        {songs.map((song) => (
          <li key={song.slug}>
            <Link href={`/${locale}/${song.slug}`}>
              <div className='cursor-pointer hover:text-blue-500'>
                {song.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
