import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Heart, Users } from "lucide-react";
import Link from "next/link";
import ConnectButton from "./connect-button";
import ConnectActions from "./connect-actions";
import { ResultOf } from "gql.tada";
import { GET_NEARBY_PEOPLE } from "@/lib/api/api-connection";

interface NearbyUserCardProps {
  user: ResultOf<typeof GET_NEARBY_PEOPLE>["data"][number];
}

export function NearbyUserCard({ user }: NearbyUserCardProps) {
  const sentReq = user.sent_req[0]?.status;

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
                  <span>{Math.round(Math.random() * 10)} groups</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  <span>{user.causes_aggregate.aggregate?.count} causes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
          <ConnectActions senderId={user.id} connectionStatus={sentReq} isSentByMe={sentReq === "pending"} />
          <ConnectButton receiverId={user.id} connectionStatus={sentReq} isSentByMe={sentReq === "pending"} />
        </div>
      </CardFooter>
    </Card>
  );
}
