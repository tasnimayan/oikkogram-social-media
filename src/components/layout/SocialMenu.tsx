"use client";
import { GoHome, GoPeople } from "react-icons/go";
import { LuBadgeCheck } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import Link from "next/link";

const SocialMenu = () => {

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full">
      <ul>
        <li>
          <Link
            href="/"
            className="flex items-center p-3 rounded hover:bg-gray-100"
          >
            <GoHome className="text-lg" />
            <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/people"
            className="flex items-center p-3 rounded hover:bg-gray-100"
          >
            <GoPeople className="text-lg" />
            <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              Community
            </span>
          </Link>
        </li>

        <li>
          <Link
            href="/bookmarks"
            className="flex items-center p-3 rounded hover:bg-gray-100"
          >
            <LuBadgeCheck className="text-lg" />
            <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              Bookmarks
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/trash"
            className="flex items-center p-3 rounded hover:bg-gray-100"
          >
            <BsTrash className="text-lg" />
            <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              Trash Bin
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialMenu;
