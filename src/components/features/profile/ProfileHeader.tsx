import { Button } from "@/components/ui/button";
import { Avatar } from "../../ui/avatar";
import { UserType } from "./user-profile";
import { Pencil } from "lucide-react";

const ProfileHeader = ({ user }: { user: UserType }) => {
  return (
    <div>
      <div className="w-full h-[20rem]">
        <div className="bg-gray-100 bg-gradient-to-b from-green-100 to-blue-100 h-full w-full"></div>
      </div>

      <div className="relative flex">
        <div className="absolute top-0 -translate-y-1/2 left-16">
          <Avatar src={user.image} className="size-40 ring-4 ring-gray-400" />
        </div>
        <div className="w-full ml-60 px-2 py-6 flex justify-between">
          <div>
            <h1 className="font-bold text-xl md:text-3xl">{user.name}</h1>
            <p className="">20 friends</p>
          </div>
          <div>
            <Button variant="outline">
              <Pencil />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
