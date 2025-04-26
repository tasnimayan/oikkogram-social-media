"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface VolunteerFormProps {
  causeId: string;
}

export function VolunteerForm({ causeId }: VolunteerFormProps) {
  const [date, setDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend
    console.log("Volunteer form submitted for cause:", causeId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You for Volunteering!</CardTitle>
          <CardDescription>Your application has been received. The organizer will contact you soon with more details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Sign-Up</CardTitle>
        <CardDescription>Fill out this form to volunteer for this cause. Your time and skills can make a real difference.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" />
            </div>

            <div className="space-y-2">
              <Label>Preferred Date</Label>
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

          <div className="space-y-2">
            <Label htmlFor="skills">Skills & Experience</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organizing">Event Organizing</SelectItem>
                <SelectItem value="marketing">Marketing & Promotion</SelectItem>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="manual">Manual Labor</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your availability, relevant experience, or any questions you have"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to be contacted about this volunteer opportunity
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your information will only be used for this cause and won't be shared with third parties.
              </p>
            </div>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
