import { GoHome,GoPeople  } from "react-icons/go";
import { FaRegAddressBook } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import PopularCard from "./UserCard";

const SocialMenu = () => {
  return (
      <div className=" bg-white shadow rounded-2xl p-4 w-full">
        <ul>
          <li>
            <div className="mb-4">
              <PopularCard />
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