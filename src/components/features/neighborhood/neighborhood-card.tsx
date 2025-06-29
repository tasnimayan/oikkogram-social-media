"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, CheckCircle } from "lucide-react";
import { ResultOf } from "gql.tada";
import { GET_NEIGHBORHOODS } from "@/lib/api/api-neighborhood";
import MiniMap from "./mini-map";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NeighborhoodCardProps {
  neighborhood: ResultOf<typeof GET_NEIGHBORHOODS>["data"][number];
  onJoin: (neighborhoodId: string) => void;
  isUserJoined: boolean;
}

export function NeighborhoodCard({ neighborhood, onJoin, isUserJoined }: NeighborhoodCardProps) {
  const [isJoined, setIsJoined] = useState(isUserJoined);

  const handleJoin = () => {
    onJoin(neighborhood.id);
    setIsJoined(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1 min-h-[12rem]">
        <MiniMap
          className="h-full"
          polygon={neighborhood.geo_polygon as string}
          lat={neighborhood.center_lat as number}
          lng={neighborhood.center_lng as number}
        />
      </div>
      <CardContent className="p-6 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{neighborhood.name}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {neighborhood.district}
                {neighborhood.division &&
                  neighborhood.division !== neighborhood.district &&
                  `, ${neighborhood.division}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {neighborhood.is_verified && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}

            <Badge variant="secondary" className="text-xs capitalize">
              {neighborhood.location_type}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {neighborhood.description.slice(0, 100)}
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4 mr-1" />
          <span>{neighborhood.member_count?.aggregate?.count || 0} members</span>
        </div>

        <div className="mt-4">
          <Button onClick={handleJoin} className="w-full" variant={isJoined ? "outline" : "secondary"}>
            {isJoined ? "Joined" : "Join Neighborhood"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
