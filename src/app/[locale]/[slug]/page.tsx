import Lyrics from "@/components/Lyrics";

export default async function SongPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  return <Lyrics slug={slug} locale={locale} />;
}
