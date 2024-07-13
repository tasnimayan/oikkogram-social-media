export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
      {children}
    </main>
  );
}
