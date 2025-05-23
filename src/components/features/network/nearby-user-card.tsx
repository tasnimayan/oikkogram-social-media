import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Heart, Users } from "lucide-react";
import Link from "next/link";
import ConnectButton from "./connect-button";
import ConnectActions from "./connect-actions";

interface NearbyUserCardProps {
  user: {
    distance: number;
    activeGroups: number;
    activeCauses: number;
    connectionStatus: string;
    id: string;
    name: string | null;
    image: string | null;
    sent_req: {
      status: string | null;
    }[];
    received_req: {
      status: string | null;
    }[];
  };
}

export function NearbyUserCard({ user }: NearbyUserCardProps) {
  let connectionStatus = null;
  let isSentByMe = false;

  if (user.sent_req.length) {
    connectionStatus = user.sent_req[0].status;
    isSentByMe = true;
  } else if (user.received_req.length) {
    connectionStatus = user.received_req[0].status;
    isSentByMe = false;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Avatar src={user.image || "/placeholder.png"} className="size-20 rounded-md" />

            <div className="flex-1 min-w-0">
              <Link href={`/profile/${user.id}`}>
                <h3 className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {user.name}
                </h3>
              </Link>
              <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 mt-1">
                <div className="flex gap-2 items-center">
                  <MapPin className="size-3.5" />
                  <span className="truncate">{"user_neighborhood"}</span>
                </div>
                {/* <div className="flex gap-2 items-center">
                  <Locate className="size-3.5" />
                  <span>{user.distance} miles away</span>
                </div> */}
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span>{user.activeGroups} groups</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  <span>{user.activeCauses} causes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
          <ConnectActions senderId={user.id} connectionStatus={connectionStatus} isSentByMe={isSentByMe} />
          <ConnectButton receiverId={user.id} connectionStatus={connectionStatus} isSentByMe={isSentByMe} />
        </div>
      </CardFooter>
    </Card>
  );
}

export const UserSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {[1, 2].map(index => (
        <Card className="overflow-hidden shadow-sm" key={index}>
          <CardContent className="p-0">
            <div className="p-4 flex items-start gap-3">
              <div className="size-20 bg-gray-100 animate-pulse rounded-md"></div>
              <h3 className="bg-gray-100 animate-pulse h-5 w-1/2 rounded"></h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
