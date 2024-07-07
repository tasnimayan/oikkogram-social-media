import NavBar from "@/components/NavBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <NavBar />
      <main className="mt-[70px] h-[calc(100vh-70px)] overflow-hidden">
        {children}
      </main>
    </div>
  )
}
