import Link from "next/link";

const LogoLink = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="OikkoGram - Connect with neighbors, act on issues and events together"
      title="OikkoGram - Connect with neighbors, act on issues and events together"
    >
      <div className="bg-gradient-to-r from-green-600 to-blue-500 rounded-md w-8 h-8 flex items-center justify-center" aria-hidden="true">
        <span className="text-white font-bold text-sm" aria-hidden="true">
          OG
        </span>
      </div>
      <span className="font-bold text-xl hidden sm:block" itemProp="name">
        Oikko<span className="text-blue-500">Gram</span>
        <span className="sr-only"> - Connect with neighbors, act on issues and events together</span>
      </span>
    </Link>
  );
};

export default LogoLink;
