import Link from "next/link";

const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-green-600 to-blue-500 rounded-md w-8 h-8 flex items-center justify-center">
        <span className="text-white font-bold text-sm">N+</span>
      </div>
      <span className="font-bold text-xl hidden sm:block">
        Neighborly<span className="text-blue-500">+</span>
      </span>
    </Link>
  );
};

export default LogoLink;
