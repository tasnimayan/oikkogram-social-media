
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>
        <Link href={"/"}>Socail Media </Link>
      </h2>
      <main className="flex justify-center pt-28 bg-gradient-to-tr from-green-100 to-indigo-200 min-h-[calc(100dvh-50px)]">
        {children}
      </main>
    </>
  );
}
