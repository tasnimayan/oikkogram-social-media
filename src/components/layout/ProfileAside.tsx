"use client"
import { useSession } from "next-auth/react";
import UserSkeleton from "../skeletons/UserSkeleton";

const ProfileAside = () => {
  const {data:session} = useSession()
  const user = session?.user

  if(!user) return <UserSkeleton />
  return (
    <div className=" overflow-hidden bg-white shadow rounded-2xl transform duration-200 easy-in-out">
      <div className="flex justify-center px-5 mt-4">
        <img className="h-32 w-32 bg-white p-2 rounded-full" src={ user.image??"placeholder.png"} alt="" />
      </div>
      <div className=" ">
        <div className="text-center px-14">
          <h2 className="text-gray-800 text-lg font-bold line-clamp-2 leading-5">{user.name}</h2>
          <a className="text-gray-400 mt-2 hover:text-blue-500 text-nowrap" href="#" target="BLANK()">@bitsofts</a>
        </div>
        <hr className="mt-6" />

        <div className="flex bg-gray-50 ">
          <a className="text-center w-full p-4 hover:bg-gray-100 text-gray-400 hover:text-blue-500 text-nowrap" href={`/profile/${user.id}`}>View Profile</a>
        </div>
      </div>
    </div>
  );
};

export default ProfileAside;