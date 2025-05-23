"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, ImagePlus, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
// import { Switch } from "@/components/ui/switch";
import { TimePicker } from "@/components/features/event/time-picker";

export default function CreateEventPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("12:00");
  const [endTime, setEndTime] = useState<string>("13:00");
  const [isVirtual, setIsVirtual] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend
    console.log("Form submitted");
    // Redirect to the events page
    router.push("/events");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Fill out the information below to create a new event in your community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="Enter a clear, descriptive title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event, what to expect, and any other important details"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="sports">Sports & Recreation</SelectItem>
                    <SelectItem value="arts">Arts & Culture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <TimePicker value={startTime} onChange={setStartTime} />
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <TimePicker value={endTime} onChange={setEndTime} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* <Switch id="virtual" checked={isVirtual} onCheckedChange={setIsVirtual} /> */}
              <Label htmlFor="virtual">This is a virtual event</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{isVirtual ? "Virtual Meeting Link/Details" : "Location"}</Label>
              <div className="relative">
                {!isVirtual && <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />}
                {isVirtual && <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />}
                <Input
                  id="location"
                  placeholder={isVirtual ? "Enter meeting link or instructions" : "Where will this event take place?"}
                  className={!isVirtual ? "pl-8" : ""}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (optional)</Label>
                <Input id="capacity" type="number" placeholder="Maximum number of attendees" min="1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Cost (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input id="cost" type="number" placeholder="0.00" min="0" step="0.01" className="pl-7" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Image (optional)</Label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Drag and drop an image, or click to browse</p>
                <Button type="button" variant="outline" size="sm">
                  Upload Image
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
