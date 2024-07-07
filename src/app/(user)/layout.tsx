
import NavBar from "@/components/NavBar";
import LeftAside from "@/components/LeftAside";
import RightAside from "@/components/RightAside";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <NavBar />
      <main className="mt-[70px]">
        <div className="grid grid-cols-12 gap-x-8 mb-8 px-12">
          {/* Left Column starts from here */}
          <LeftAside />
          <div className="col-span-6">
            {children}
          </div>
          <RightAside />
          
        </div>
      </main>
    </div>

  );
}
