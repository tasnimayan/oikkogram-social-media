import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Heart, Users, Clock, UserPlus, UserCheck, X, Locate } from "lucide-react";
import Link from "next/link";
import ConnectButton from "./connect-button";

interface NearbyUserCardProps {
  user: {
    distance: number;
    interests: string[];
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

  if (user.sent_req.length) {
    connectionStatus = user.sent_req[0].status;
  } else if (user.received_req.length) {
    connectionStatus = user.received_req[0].status;
  }

  const getActionButton = () => {
    switch (connectionStatus) {
      case "accepted":
        return (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/profile/${user.id}`}>View Profile</Link>
          </Button>
        );
      case "pending":
        return <Button className="w-full ">Cancel</Button>;
      default:
        return (
          <Button variant="outline" className="w-full">
            <X className="h-4 w-4" /> Remove
          </Button>
        );
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Avatar src={user.image || "/placeholder.svg"} className="size-20 rounded-md" />

            <div className="flex-1 min-w-0">
              <Link href={`/profile/${user.id}`}>
                <h3 className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{user.name}</h3>
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
          {getActionButton()}
          <ConnectButton receiverId={user.id} connectionStatus={connectionStatus} />
        </div>
      </CardFooter>
    </Card>
  );
}
