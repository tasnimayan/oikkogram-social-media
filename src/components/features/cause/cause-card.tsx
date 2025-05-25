import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ResultOf } from "gql.tada";
import { GET_CAUSES } from "@/lib/api/api-cause";
import { SupportButton } from "./support-button";

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
        {/* Title */}
        <Link href={`/causes/${cause.id}`}>
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {cause.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{cause.description}</p>

        {/* Progress */}
        {cause.goal_value && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">{cause.current_value / cause.goal_value}% Complete</span>
              <span className="text-gray-500 dark:text-gray-400">{cause.goal_value}</span>
            </div>
            <Progress
              value={cause.current_value / cause.goal_value}
              className={cn(
                "h-2",
                cause.current_value / cause.goal_value < 30
                  ? "bg-red-100 dark:bg-red-900"
                  : cause.current_value / cause.goal_value < 70
                  ? "bg-yellow-100 dark:bg-yellow-900"
                  : "bg-green-100 dark:bg-green-900"
              )}
              // indicatorClassName={cn(cause.progress < 30 ? "bg-red-500" : cause.progress < 70 ? "bg-yellow-500" : "bg-green-500")}
            />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>{cause.total_supporters?.aggregate?.count || 0} supporters</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Avatar
              src={cause.created_by.image || "/placeholder.png"}
              name={cause.created_by.name || ""}
              className="h-7 w-7 mr-2"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">By {cause.created_by.name}</span>
          </div>
          <SupportButton causeId={cause.id} status={!!cause.is_supporter} />
        </div>
      </div>
    </div>
  );
}
