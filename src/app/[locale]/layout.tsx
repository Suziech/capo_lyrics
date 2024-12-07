import Header from "@/components/Header";

export default function RootLayoout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='max-w-[1440px] mx-auto'>{children}</main>
    </>
  );
}
