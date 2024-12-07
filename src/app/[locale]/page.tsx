import SongFinder from "@/components/SongFinder";
import { createTranslation } from "@/utils/localization/server";
import type { LocaleTypes } from "@/utils/localization/settings";

export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "home");
  return (
    <SongFinder
      locale={locale}
      title={t("title")}
      description={t("description")}
    />
  );
}
