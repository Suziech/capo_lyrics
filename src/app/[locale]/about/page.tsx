import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";

export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "about");
  return (
    <div className='px-[20px] flex flex-col items-center pt-[80px]'>
      <h2 className='text-2xl font-bold p-6 text-center whitespace-pre-wrap'>
        {t("title")}
      </h2>
      <p className='text-sm whitespace-pre-wrap leading-6'>
        {t("description")}
      </p>

      <button className='bg-blue-500 text-white px-4 py-2 rounded-md my-10 hover:bg-blue-600'>
        <a href='mailto:ccsk09@naver.com' className='block text-white'>
          {t("sendSong")}
        </a>
      </button>
    </div>
  );
}
