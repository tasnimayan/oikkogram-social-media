// User post avatar box with options button
// Receives details as parameter which should be an object containing {name:str, time:str, isVerified:bool}

import Link from "next/link";
import { UserType } from "@/lib/interfaces";
import { Avatar } from "../ui/avatar";
import { Globe, Lock } from "lucide-react";

interface AvatarBoxProps extends UserType {
  time?: string;
  privacy?: string | undefined;
}

const AvatarInfo = ({ details }: { details: AvatarBoxProps }) => {
  const { name, image, time, privacy, id } = details;
  return (
    <div className="flex items-center space-x-3">
      <Avatar src={image || "/placeholder.png"} name={name} />

      <div>
        <div className="flex items-center space-x-2">
          <Link href={`/profile/${id}`}>
            <p className="font-medium text-secondary-500">{name}</p>
          </Link>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>{time || "Unknown Time"}</span>
          <span className="inline-block ms-2 cursor-pointer">
            {privacy === "private" ? <Lock className="size-4" /> : <Globe className="size-4" />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarInfo;
