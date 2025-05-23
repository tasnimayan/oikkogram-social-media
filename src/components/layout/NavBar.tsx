"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineHome } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import SignOutBtn from "../buttons/SignOutBtn";
import { IconType } from "react-icons";
import {FaRegBell, FaRegHandshake } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import LogoLink from "./LogoLink";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import LeftAside from "./LeftAside";


const NavBar: React.FunctionComponent = () => {
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <nav className="w-full bg-white fixed top-0 z-50 shadow h-[70px]">
      <div className="container mx-auto md:px-4 py-3 flex items-center justify-between">
        <LogoLink/>

        <div className="flex gap-x-4 text-gray-600">
          <NavLink href="/" currentPath={currentPath} label="Home" icon={<MdOutlineHome />} />
          <NavLink href="/people" currentPath={currentPath} label="People" icon={<HiOutlineUserGroup />} />
          <NavLink href="/friends" currentPath={currentPath} label="Friends" icon={<FaRegHandshake />} />
          <NavLink href="/notification" currentPath={currentPath} label="Notification" icon={<FaRegBell />} />
        </div>

        <div className="flex items-center gap-4">
          
          <NavLink href="/chat" currentPath={currentPath} label="Chat" icon={<IoChatboxEllipsesOutline />} />
          <div className="hidden md:block"><SignOutBtn /></div>
          <button className="md:hidden" onClick={()=>setIsMenuOpen(!isMenuOpen)}><IoMenu className="text-3xl"/></button>

        </div>
      </div>

      {/* Mobile Left Aside Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`absolute left-0 top-0 bottom-0 w-4/6 bg-white shadow-lg`}>
            <LeftAside />
            <div className="flex justify-center my-4">
              <SignOutBtn />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkType {
  href: string
  currentPath: string
  label: string
  icon?: IconType | any
}
const NavLink = ({ href, currentPath, label, icon }:NavLinkType) => (
  <Link 
    href={href} 
    className={`w-full py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded-md ${currentPath === href ? "text-blue-500 shadow-lg border bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}  
    aria-label={label} 
    title={label}
  >
    <span className="text-2xl md:text-md">{icon}</span>
  </Link>
);


export default NavBar;