import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MapPin, Share2, Users } from "lucide-react";
import Link from "next/link";
import { ResultOf } from "gql.tada";
import { GET_CAUSES } from "@/lib/api/api-cause";
import CauseOptions from "./cause-options";
import { format } from "date-fns";
import { SupportButton } from "./support-button";

interface FeaturedCauseProps {
  causeData: ResultOf<typeof GET_CAUSES>["data"][number];
}

export function FeaturedCause({ causeData }: FeaturedCauseProps) {
  if (!causeData) return null;
  const cause = {
    ...causeData,
    supporters: [1, 3, 3, 5],
    volunteers: 12,
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image section */}
        <div className="relative h-64 md:h-full">
          <img src={cause.cover_img_url || ""} alt={cause.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-600 text-white border-none">Featured</Badge>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 flex flex-col">
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="mb-2">
                {cause.category}
              </Badge>
              <CauseOptions causeId={cause.id} />
            </div>
            <Link href={`/causes/${cause.id}`}>
              <h3 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {cause.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{cause.location}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>Starts {format(cause.start_date, "PP")}</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{cause.description}</p>

          {cause.goal_type && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{cause.current_value ?? ""}% Complete</span>
                <span className="text-gray-500 dark:text-gray-400">{cause.goal_value}</span>
              </div>
              <Progress value={cause.current_value} className="h-2" />
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              <span className="font-medium">{cause.supporters.length} supporters</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-blue-600" />
              <span className="font-medium">{cause.volunteers} volunteers</span>
            </div>
          </div>

          <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <Avatar
              className="h-8 w-8 mr-2"
              src={cause.created_by.image || "/placeholder.png"}
              name={cause.created_by.name}
            />

            <div className="flex-1">
              <div className="text-xs text-gray-500 dark:text-gray-400">Organized by</div>
              <div className="text-sm font-medium">{cause.created_by.name}</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <SupportButton cause_id={cause.id} status={!!cause.is_supporter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
