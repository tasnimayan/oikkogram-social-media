export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 size-full bg-black/85 text-white flex flex-col items-center justify-center z-[9999] text-2xl tracking-wide">
        <div>🚧 This page is currently under development</div>
      </div>
      <div className="w-full h-full overflow-hidden">{children}</div>
    </>
  );
}
