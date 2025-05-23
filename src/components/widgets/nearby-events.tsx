import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";

const upcomingEvents = [
  {
    id: "1",
    title: "Community Cleanup",
    date: "Sat, Apr 27",
    location: "Central Park",
    attendees: 24,
  },
  {
    id: "2",
    title: "Farmers Market",
    date: "Sun, Apr 28",
    location: "Main Street",
    attendees: 52,
  },
  {
    id: "3",
    title: "Book Club Meeting",
    date: "Tue, Apr 30",
    location: "Library",
    attendees: 12,
  },
];

const NearbyEvents: React.FC = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Upcoming Events</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/events" className="flex items-center gap-1 text-xs">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {upcomingEvents.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <div className="mt-1 flex items-center text-xs text-muted-foreground gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>
              <div className="mt-2 text-xs">{event.attendees} neighbors attending</div>
            </div>
          </Link>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-3">
        Create Event
      </Button>
    </Card>
  );
};

export default NearbyEvents;
