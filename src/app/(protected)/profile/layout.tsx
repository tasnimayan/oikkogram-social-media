export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(var(--vh)_*100_-_4rem)] overflow-hidden">{children}</div>;
}
