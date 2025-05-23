import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { User } from "@/lib/types";

interface EventAttendeesProps {
  attendees: User[];
}

export function EventAttendees({ attendees }: EventAttendeesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendees</CardTitle>
        <CardDescription>{attendees.length} people are attending this event</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input type="search" placeholder="Search attendees..." className="pl-8" />
        </div>

        {attendees.length > 0 ? (
          <div className="space-y-4">
            {attendees.map(attendee => (
              <div key={attendee.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={attendee.avatar || "/placeholder.png"} alt={attendee.name} />
                  <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{attendee.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{attendee.neighborhood}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No attendees yet. Be the first to RSVP!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
