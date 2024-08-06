import { UserType } from "@/lib/Interface";
import Avatar from "../Avatar";
import ProfileTabs from "./ProfileTabs";
import { FaEdit } from "react-icons/fa";

const ProfileHeader = ({ user }: { user: UserType }) => {
  return (
    <div>
      <div className="w-full flex justify-center" style={{ height: "348px" }}>
        <div className="flex flex-col">
          <div
            className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
          bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
            style={{ width: "940px", height: "348px" }}
          >
            <div className="md:absolute top-48 inset-x-96">
              <Avatar src={user?.image} size={48} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col mt-5 mb-3.5">
        <h1 className="text-center font-bold text-3xl">{user.name}</h1>
        <ul className="flex justify-center mb:pl-14">
          <li className="px-2 font-semibold">
            <button className="flex items-center bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold">
              <FaEdit className="mr-2 text-xs" /> Edit Profile
            </button>
          </li>
        </ul>
        <hr className="self-center w-2/3 mt-2" />
      </div>

      <ProfileTabs />
    </div>
  );
};

export default ProfileHeader;
