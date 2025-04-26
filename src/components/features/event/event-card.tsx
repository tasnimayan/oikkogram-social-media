import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      {event.image && (
        <div className="h-40 overflow-hidden">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2 flex items-start justify-between">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-none">{event.category}</Badge>
          {event.isVirtual && (
            <Badge variant="outline" className="border-green-200 text-green-800 dark:border-green-800 dark:text-green-300">
              Virtual
            </Badge>
          )}
        </div>

        <Link href={`/events/${event.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{event.title}</h3>
        </Link>

        <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
            <span>{format(new Date(event.date), "EEE, MMM d")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
            <span>{format(new Date(event.date), "h:mm a")}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
            <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <span className="text-gray-500 dark:text-gray-400">By </span>
            <span className="font-medium">{event.organizer.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-3 w-3 mr-1" />
            <span>{event.attendees.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
