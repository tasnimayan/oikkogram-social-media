import { GoHome,GoPeople  } from "react-icons/go";
import { FaRegAddressBook } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";



const SocialMenu = () => {
  return (
      <div className=" bg-white shadow rounded-2xl p-4 w-full">
        <ul>
          <li>
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
              </div>
            </div>
          </li>

          <li>
            <div className="flex items-center p-3 rounded hover:bg-gray-100">
              <GoHome className="text-lg"/>
              <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Home</span>
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 rounded hover:bg-gray-100">
              <GoPeople  className="text-lg"/>
              <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Community</span>
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 rounded hover:bg-gray-100">
              <FaRegAddressBook className="text-lg"/>
              <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Following</span>
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 rounded hover:bg-gray-100">
              <LuBadgeCheck className="text-lg"/>
              <span className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Favourite</span>
            </div>
          </li>
                

              


        </ul>
      </div>
  );
};

export default SocialMenu;