"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function ChangeLocale() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // 현재 locale을 제외한 URL 세그먼트 구성
    const updatedSegments = urlSegments.filter(
      (segment) => segment !== params.locale
    );

    // 새로운 locale을 추가한 URL로 이동
    router.push(`/${newLocale}/${updatedSegments.join("/")}`);
  };

  return (
    <div>
      <select onChange={handleLocaleChange} value={params.locale}>
        <option value='en'>🇺🇸 English</option>
        <option value='ko'>🇰🇷 한국어</option>
        <option value='ja'>🇯🇵 日本語</option>
      </select>
    </div>
  );
}
