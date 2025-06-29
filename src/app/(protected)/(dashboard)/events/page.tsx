"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/features/event/event-card";
import { EventFilters } from "@/components/features/event/event-filters";
import { EventCalendar } from "@/components/features/event/event-calendar";
import { EventMap } from "@/components/features/event/event-map";
import { events } from "@/lib/constants/data";
import { Calendar, List, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar" | "map">("list");

  // Group events by date for the list view
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(new Date(event.date), "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Neighborhood Events</h1>
        <Link href="/events/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-lg shadow p-4">
        <EventFilters />

        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size="sm"
            className={view === "calendar" ? "rounded-none bg-blue-600" : "rounded-none"}
            onClick={() => setView("calendar")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={view === "map" ? "default" : "ghost"}
            size="sm"
            className={view === "map" ? "rounded-none bg-blue-600" : "rounded-none"}
            onClick={() => setView("map")}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-events">My Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {view === "list" && (
            <div className="space-y-8">
              {sortedDates.map(dateKey => (
                <div key={dateKey}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                    {eventsByDate[dateKey].map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "calendar" && <EventCalendar events={events} />}

          {view === "map" && <EventMap events={events} />}
        </TabsContent>

        <TabsContent value="my-events" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">You haven't created or RSVP'd to any events yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              When you create or RSVP to events, they'll appear here.
            </p>
            <Link href="/events/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No past events to display</h3>
            <p className="text-gray-500 dark:text-gray-400">Past events you've attended will be shown here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
