"use client";

import React from "react";
import { RiHome2Line } from "react-icons/ri";
import { MdTravelExplore, MdHotel } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar: React.FunctionComponent = () => {
  // const user = sessionStorage.getItem('user')
  const currentPath = usePathname();

  useEffect(() => {
    //   if(!user && Cookies.get('tvUserToken')){
    //     dispatch(fetchUser())
    //   }
  }, []);

  return (
    <div className="w-full bg-white fixed top-0 z-50 shadow">
      <div className="px-4 py-3 text-gray-900 font-medium capitalize flex items-center justify-between">
        <a className="px-2 mr-2 border-r border-gray-800 text-xl" href="/">
          <h2 className="inline-block">Social Media</h2>
        </a>

        <div className="flex gap-x-2">
          <Link
            href="/"
            className={currentPath == "/" ? "nav-item active" : "nav-item"}
          >
            <RiHome2Line className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Feed</span>
          </Link>

          <Link
            href="/friends"
            className={
              currentPath == "/friends" ? "nav-item active" : "nav-item"
            }
          >
            <MdTravelExplore className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Friends</span>
          </Link>

          <Link
            href="/chat"
            className={currentPath == "/chat" ? "nav-item active" : "nav-item"}
          >
            <FaMapLocationDot className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Chat</span>
          </Link>
        </div>

        <div>
          {/* {
              user?<Avatar user={user}/> : (<>
              <Link path="/login" className="rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white transition-transform duration-200 ease-in-out mr-3 hover:shadow-md hover:shadow-blue-300/75">Login</Link>
              <Link path="/signup" className="rounded bg-green-600 py-2 px-4 text-sm font-medium text-white transition-transform duration-200 ease-in-out hover:shadow-md hover:shadow-green-300/75">Sign up</Link>
              </>)
            } */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
