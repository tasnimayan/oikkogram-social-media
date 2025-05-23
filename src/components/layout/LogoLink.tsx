import Link from "next/link";

const LogoLink = () => {
  return (
    <Link href="/" className="px-2 mr-2 text-xl inline-block" aria-label="Next Buddy Home">
      <h2 className="flex text-xl text-nowrap border rounded-md overflow-hidden">
        <span className="ps-2 pe-1 bg-c-primary py-2">N<span className='hidden md:inline-block'>ext</span></span>
        <span className="bg-c-secondary pe-2 ps-1 py-2 !text-[#004696] font-extrabold">B<span className='hidden md:inline-block transform'>uddy</span></span></h2>
    </Link>
  );
};

export default LogoLink;
