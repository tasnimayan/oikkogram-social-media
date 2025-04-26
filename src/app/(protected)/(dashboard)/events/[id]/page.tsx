"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventAttendees } from "@/components/features/event/event-attendees";
import { EventComments } from "@/components/features/event/event-comments";
import { events } from "@/lib/constants/data";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventMap } from "@/components/features/event/event-map";
import { RSVPButton } from "@/components/features/event/rsvp-button";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  // In a real app, you would fetch the event data based on the ID
  const event = events.find((e) => e.id === params.id) || events[0];
  const [isAttending, setIsAttending] = useState(false);

  const handleRSVP = (attending: boolean) => {
    setIsAttending(attending);
    // In a real app, you would update the backend
    console.log(`User RSVP'd ${attending ? "yes" : "no"} to event ${event.id}`);
  };

  return (
    <div className="space-y-6">
      <Link href="/events" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center mb-4">
        ← Back to Events
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {event.image && (
          <div className="relative h-64 w-full">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-none">{event.category}</Badge>
                {event.isVirtual && (
                  <Badge variant="outline" className="border-green-200 text-green-800 dark:border-green-800 dark:text-green-300">
                    Virtual
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

              <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {format(new Date(event.date), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                  <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm">Organized by</div>
                  <div className="font-medium">{event.organizer.name}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg min-w-[250px]">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Attendees</span>
                  <span className="text-sm">
                    {event.attendees.length} / {event.capacity || "∞"}
                  </span>
                </div>
                <div className="flex -space-x-2 overflow-hidden">
                  {event.attendees.slice(0, 5).map((attendee) => (
                    <Avatar key={attendee.id} className="border-2 border-white dark:border-gray-800 h-8 w-8">
                      <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees.length > 5 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 text-xs font-medium border-2 border-white dark:border-gray-800">
                      +{event.attendees.length - 5}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <RSVPButton eventId={event.id} onRSVP={handleRSVP} isAttending={isAttending} />
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">{event.description}</p>

              {event.agenda && (
                <>
                  <h3 className="text-lg font-medium mt-6 mb-2">Agenda</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {event.agenda.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {!event.isVirtual && (
                <>
                  <h3 className="text-lg font-medium mt-6 mb-2">Location</h3>
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                    <EventMap events={[event]} singleEvent />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                </>
              )}

              {event.isVirtual && (
                <>
                  <h3 className="text-lg font-medium mt-6 mb-2">How to join</h3>
                  <p>This is a virtual event. A link to join will be sent to registered attendees before the event.</p>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendees" className="mt-0">
          <EventAttendees attendees={event.attendees} />
        </TabsContent>

        <TabsContent value="discussion" className="mt-0">
          <EventComments eventId={event.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
