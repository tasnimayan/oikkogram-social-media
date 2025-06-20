"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Event } from "@/lib/types";
import { format, addMonths, subMonths, isSameDay } from "date-fns";

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date());

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  // Custom day render function to show events
  const renderDay = (day: Date) => {
    const dayEvents = getEventsForDay(day);
    const hasEvents = dayEvents.length > 0;

    return (
      <div className="relative w-full h-full">
        <div className={`w-full h-full flex items-center justify-center ${hasEvents ? "font-bold" : ""}`}>
          {format(day, "d")}
        </div>
        {hasEvents && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-blue-600"></div>
            {dayEvents.length > 1 && (
              <>
                <div className="h-1 w-1 rounded-full bg-blue-600 mx-0.5"></div>
                {dayEvents.length > 2 && <div className="h-1 w-1 rounded-full bg-blue-600"></div>}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">{format(month, "MMMM yyyy")}</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => setMonth(subMonths(month, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setMonth(addMonths(month, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        className="rounded-md border"
        components={{
          Day: ({ date }) => renderDay(date),
        }}
        selected={new Date()}
        onSelect={date => {
          if (date) {
            const eventsForDay = getEventsForDay(date);
            console.log(`Selected ${format(date, "PPP")}. Events:`, eventsForDay);
          }
        }}
      />

      <div className="mt-4 space-y-2">
        <h3 className="font-medium text-sm">Upcoming Events</h3>
        {events.length > 0 ? (
          <div className="space-y-1">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="font-medium">{event.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(event.date), "MMM d, h:mm a")}
                </div>
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium pt-1">
                + {events.length - 3} more events
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">No upcoming events</div>
        )}
      </div>
    </div>
  );
}
