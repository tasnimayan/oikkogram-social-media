'use client'
import { useState } from 'react'
import { FaPlus, FaChevronDown, FaBell, FaUserGroup, FaRegMessage } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { MdFeed, MdOndemandVideo  } from "react-icons/md";
import LogoLink from './LogoLink'
import Link from 'next/link'
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';


function Header() {

    const [isAccountMenuDisplay, setIsAccountMenuDisplay] = useState("hidden")
    const show = () => isAccountMenuDisplay == "hidden" ? setIsAccountMenuDisplay("") : setIsAccountMenuDisplay("hidden")
  const currentPath = usePathname();


    return (
        <nav className="bg-white h-max md:h-14 w-full shadow-sm flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b">

            <div className="flex items-center justify-between w-full md:w-max px-2 py-2">
              <LogoLink />
            </div>

            <div className="flex gap-x-4 text-gray-600">
                <NavLink href="/" currentPath={currentPath} label="Home" icon={<FaHome />} />
                <NavLink href="/people" currentPath={currentPath} label="People" icon={<FaUserGroup />} />
                {/* <NavLink href="/friends" currentPath={currentPath} label="Friends" icon={<GoPeople />} /> */}
                <NavLink href="/notification" currentPath={currentPath} label="Notification" icon={<FaBell />} />
                {/* <NavLink href="/chat" currentPath={currentPath} label="Chat" icon={<IoChatboxEllipsesOutline />} /> */}
            </div>




            <ul className="flex w-full lg:w-max items-center justify-center gap-x-3">
                <li className="w-1/5 md:w-max text-center">
                    <Link href="/" className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block text-blue-500 border-b-4 border-blue-500">
                        <FaHome />
                    </Link>
                </li>
                <li className="w-1/5 md:w-max text-center">
                    <a href="/people" className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100">
                        <MdOndemandVideo />
                        <span className="text-xs absolute top-0 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">9+</span>
                    </a>
                </li>
                <li className="w-1/5 md:w-max text-center">
                    <Link href="/people" className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100">
                        <FaUserGroup />
                    </Link>
                </li>
                <li className="w-1/5 md:w-max text-center">
                    <a href="" className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100">
                        <MdFeed />
                    </a>
                </li>
                <li className="w-1/5 md:w-max text-center inline-block md:hidden">
                    <a href="/notification" className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100">
                        <i className='bx bx-menu'></i>
                    </a>
                </li>
            </ul>
            {/* // <!-- END MAIN NAV */}

            {/* // <!-- RIGHT NAV */}
            <ul className="hidden md:flex mx-4 items-center justify-center">
                {/* Profile */}
                <li className="h-full hidden xl:flex">
                    <Link href="/profile" className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1">
                        <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="rounded-full h-7 w-7" />
                        <span className="mx-2 font-semibold">Can</span>
                    </Link>
                </li>
                <li>
                    <div className="text-xl hidden xl:grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                        <FaPlus />
                    </div>
                </li>
                {/* Messenger */}
                <li>
                    <Link href="/messages" className="text-xl hidden xl:grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                        <FaRegMessage />
                    </Link>
                </li>
                {/* Notifications */}
                <li>
                    <Link href="/notification" className="text-xl grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                        <FaBell />
                        {/* <span className="text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center">2</span> */}
                    </Link>
                </li>
                {/* Account menu */}
                <li>
                    <div id="open-account-menu" onClick={show} className="text-xl grid place-items-center bg-gray-200 rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300">
                        <FaChevronDown />
                    </div>
                </li>
            </ul>
            {/* // <!-- END RIGHT NAV */}

            {/* ACCOUNT MENU */}
            <div className={`${isAccountMenuDisplay} right-6 md:absolute -mb-96 mt-12 p-4 lg:w-max shadow rounded-lg bg-white dark:bg-dark-second`}>
                <div className="p-2 border-b border-gray-300 w-80 dark:border-dark-third flex space-x-4">
                    <ul className="w-96">
                        <li className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all">
                            <Link href="/profile">
                                <div className="flex">
                                    <div>
                                        <img src="./images/profile_photo_cat.jpg" className="rounded-full w-16" />
                                    </div>
                                    <div className="flex flex-col ml-3">
                                        <h1 className="font-semibold">Can Canbolat</h1>
                                        <p className="mt-2">See your profile</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <hr className="p-1 m-2" />
                        <li className="p-2 cursor-pointer font-semibold hover:bg-gray-100 rounded-lg transition-all">Give Feedback</li>
                        <hr className="p-1 m-2" />
                        <li className="p-2 cursor-pointer font-semibold hover:bg-gray-100 rounded-lg transition-all">
                            <Link href="/settings">
                                Settings & privacy
                            </Link>
                        </li>
                        <li className="p-2 cursor-pointer font-semibold hover:bg-gray-100 rounded-lg transition-all">Help & support</li>
                        <li className="p-2 cursor-pointer font-semibold hover:bg-gray-100 rounded-lg transition-all">Display & accessibility</li>
                        <li className="p-2 cursor-pointer font-semibold hover:bg-gray-100 rounded-lg transition-all">Log Out</li>
                    </ul>
                </div>
            </div>
            {/* END ACCOUNT MENU */}
        </nav>
    )


}


interface NavLinkType {
  href: string
  currentPath: string
  label: string
  icon?: IconType | any
}
const NavLink = ({ href, currentPath, label, icon }:NavLinkType) => (
  <Link href={href} className={`nav-item ${currentPath === href ? "active" : ""}`}  aria-label={label}>
    <span className="mr-1 text-md">{icon}</span>
    <span className="hidden md:inline-block">{label}</span>
  </Link>
);

export default Header