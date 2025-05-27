import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ResultOf } from "gql.tada";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { SupportButton } from "./support-button";
import VolunteerButton from "./volunteer-button";

type CauseType = ResultOf<typeof GET_CAUSES>["data"][number];

interface CauseCardProps {
  cause: CauseType;
  variant?: "default" | "trending";
}

export function CauseCard({ cause, variant = "default" }: CauseCardProps) {
  const isTrending = variant === "trending";

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge
          className={cn(
            "bg-white/90 backdrop-blur-sm text-gray-800 dark:bg-gray-800/90 dark:text-gray-200 border-none",
            isTrending && "bg-blue-600/90 text-white dark:bg-blue-600/90"
          )}
        >
          {cause.category}
        </Badge>
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cause.cover_img_url || "/placeholder.png"}
          alt={cause.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Location overlay */}
        <div className="absolute bottom-3 left-3 flex items-center text-white text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{cause.location}</span>
        </div>

        {/* Date overlay */}
        <div className="absolute bottom-3 right-3 flex items-center text-white text-sm">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(cause.start_date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Avatar
              src={cause.created_by.image || "/placeholder.png"}
              name={cause.created_by.name || ""}
              className="h-7 w-7 mr-2"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">By {cause.created_by.name}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/causes/${cause.id}`}>
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {cause.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{cause.description}</p>

        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-rose-500" />
            <span>{cause.total_supporters?.aggregate?.count || 0} supporters</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-amber-500" />
            <span>
              {cause.total_volunteers?.aggregate?.count || 0}/{cause.goal_value} volunteers
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <SupportButton causeId={cause.id} status={!!cause.is_supporter} />
          <VolunteerButton causeId={cause.id} />
        </div>
      </div>
    </div>
  );
}
