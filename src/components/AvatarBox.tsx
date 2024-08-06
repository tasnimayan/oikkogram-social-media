// User post avatar box with options button
// Receives details as parameter which should be an object containing {name:str, time:str, isVerified:bool}

import Link from "next/link";
import Avatar from "./Avatar";
import { BsGlobeAmericas } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { UserType } from "@/lib/Interface";

interface AvatarBoxProps extends UserType {
  time?: string;
  privacy?: string | undefined;
}

const AvatarBox = ({ details }: {details:AvatarBoxProps}) => {
  const { name, image, time, privacy } = details;
  return (
    <div className="flex items-center space-x-3">
      <Avatar src={image??''} size={10} />
      <div>
        <div className="flex items-center space-x-2">
          <Link href={`/profile/${details.id}`}>
            <p className="text-sm font-medium text-secondary-500">{name}</p>
          </Link>
        </div>
        <div className="text-xs text-secondary-400">
          <span>{time || "Unknown Time"}</span>
          <span className="inline-block ms-2">
            {privacy === "private" ? <IoIosLock /> : <BsGlobeAmericas />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarBox;
