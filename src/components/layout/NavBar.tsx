"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiHome2Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import SignOutBtn from "../buttons/SignOutBtn";

const NavBar: React.FunctionComponent = () => {
  const currentPath = usePathname();

  return (
    <div className="w-full bg-white fixed top-0 z-50 shadow h-[70px]">
      <div className="px-4 py-3 text-gray-900 font-medium capitalize flex items-center justify-between">

          <a href="/" className="px-2 mr-2 border-r border-gray-800 text-xl" >
            <h2 className="inline-block">Social Media</h2>
          </a>


        <div className="flex gap-x-2 text-gray-600">
          <Link
            href="/"
            className={currentPath == "/" ? "nav-item active" : "nav-item"}
          >
            <RiHome2Line className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Home</span>
          </Link>

          <Link
            href="/people"
            className={
              currentPath == "/people" ? "nav-item active" : "nav-item"
            }
          >
            <GoPeople className="mr-1 inline-block" />
            <span className="hidden md:inline-block">People</span>
          </Link>

          <Link
            href="/friends"
            className={
              currentPath == "/friends" ? "nav-item active" : "nav-item"
            }
          >
            <GoPeople className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Friend</span>
          </Link>

          <Link
            href="/notification"
            className={
              currentPath == "/notification" ? "nav-item active" : "nav-item"
            }
          >
            <IoIosNotificationsOutline className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Notification</span>
          </Link>

          <Link
            href="/chat"
            className={currentPath == "/chat" ? "nav-item active" : "nav-item"}
          >
            <IoChatboxEllipsesOutline className="mr-1 inline-block" />
            <span className="hidden md:inline-block">Chat</span>
          </Link>
        </div>

        <div>
          <div className="px-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user"
              />
            </div>
          </div>

          {/* {
              user?<Avatar user={user}/> : (<>
              <Link path="/login" className="rounded bg-blue-600 py-2 px-4 text-sm font-medium text-white transition-transform duration-200 ease-in-out mr-3 hover:shadow-md hover:shadow-blue-300/75">Login</Link>
              <Link path="/signup" className="rounded bg-green-600 py-2 px-4 text-sm font-medium text-white transition-transform duration-200 ease-in-out hover:shadow-md hover:shadow-green-300/75">Sign up</Link>
              </>)
            } */}
        </div>

        <SignOutBtn />
      </div>
    </div>
  );
};

export default NavBar;
