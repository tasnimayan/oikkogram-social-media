import { UserType } from "@/lib/Interface";
import ProfileTabs from "./ProfileTabs";
import PlusButton from "../buttons/PlusButton";

const ProfileHeader = ({ user }: { user: UserType }) => {

  if(!user) return null
  return (
    <div className="flex justify-center flex-col">
      {/* <div className="w-full flex justify-center"> */}
        <div className="flex flex-col w-full items-center">
          <div className="bg-gray-100 md:rounded-bl-lg md:rounded-br-lg bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400 w-full h-56 md:w-[940px] md:h-[348px] "
          >
          </div>
          <div className="relative -mt-20 ms-4 md:ms-16 z-1">
            <div className="h-32 w-32 md:h-48 md:w-48 relative">
              <img className="w-full h-full bg-white p-2 rounded-full object-cover" src={user.image ?? "placeholder.png"} alt="" />
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
                <PlusButton />
              </div>
            </div>
          </div>
        </div>
        
      {/* </div> */}

      <div className="flex justify-center flex-col mt-3 md:mt-5 mb-3.5 ">
        <h1 className=" text-center font-bold text-2xl md:text-3xl">{user.name}</h1>
        <hr className="self-center w-5/6 md:w-2/3 mt-2" />
      </div>

      <ProfileTabs />
    </div>
  );
};

export default ProfileHeader;
