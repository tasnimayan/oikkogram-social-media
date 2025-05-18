"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ImagePlus, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CauseFormValues, causeSchema } from "@/lib/schemas/cause-schema";
import { zodResolver } from "@hookform/resolvers/zod";

// Predefined categories and tags for the form
const CATEGORIES = [
  { label: "Environment", value: "environment" },
  { label: "Community Development", value: "community" },
  { label: "Education", value: "education" },
  { label: "Health & Wellness", value: "health" },
  { label: "Animal Welfare", value: "animals" },
  { label: "Arts & Culture", value: "arts" },
  { label: "Other", value: "other" },
];

export default function CreateCausePage() {
  const router = useRouter();
  const [causeImage, setCauseImage] = useState<File>();

  // Form setup with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CauseFormValues>({
    resolver: zodResolver(causeSchema),
    defaultValues: {
      goal_type: "awareness",
    },
  });

  // Watch values for conditional rendering
  const goalType = watch("goal_type");
  const startDate = watch("start_date");

  const onSubmit = async (data: CauseFormValues) => {
    console.log("Form submitted", data);

    // Redirect to the causes page
    router.push("/causes");
  };

  const endDate = watch("end_date");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Cause</h1>

      <Card>
        <CardHeader>
          <CardTitle>Cause Details</CardTitle>
          <CardDescription>Fill out the information below to create a new cause in your community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
                Cause Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a clear, descriptive title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your cause, its goals, and why it matters to the community"
                className={cn("min-h-[120px]", errors.description ? "border-red-500" : "")}
                {...register("description")}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Where will this take place?"
                    className={cn("pl-8", errors.location ? "border-red-500" : "")}
                    {...register("location")}
                  />
                </div>
                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date" className={errors.start_date ? "text-red-500" : ""}>
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start_date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                        errors.start_date && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={date => setValue("start_date", date as Date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="end_date" variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watch("end_date") || undefined}
                      onSelect={date => setValue("end_date", date)}
                      initialFocus
                      disabled={date => date < startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className={errors.category ? "text-red-500" : ""}>
                  Category
                </Label>
                <Select onValueChange={value => setValue("category", value)} defaultValue={watch("category")}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Tags (Optional) <span className="text-xs text-muted-foreground">max 5 tags</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                <Input
                  type="text"
                  placeholder="e.g. volunteer, social, location etc"
                  className="placeholder:text-gray-400 placeholder:italic"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="goal_type">Goal Type</Label>
                <Select onValueChange={(value: string) => setValue("goal_type", value)} defaultValue={goalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volunteers">Volunteers</SelectItem>
                    <SelectItem value="funding">Funding</SelectItem>
                    <SelectItem value="awareness">Awareness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal_value">Goal Value {goalType !== "awareness" ? "(Required)" : "(Optional)"}</Label>
                <Input
                  id="goal_value"
                  type="number"
                  min={0}
                  placeholder={
                    goalType === "volunteers"
                      ? "Number of volunteers needed"
                      : goalType === "funding"
                      ? "Funding amount needed"
                      : "Target number (optional)"
                  }
                  onChange={e => {
                    const value = e.target.value === "" ? null : Number.parseInt(e.target.value, 10);
                    setValue("goal_value", value);
                  }}
                  className={errors.goal_value ? "border-red-500" : ""}
                />
                {errors.goal_value && <p className="text-sm text-red-500">{errors.goal_value.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cause Image (optional)</Label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                {causeImage ? (
                  <p>{causeImage.name}</p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Drag and drop an image, or click to browse
                  </p>
                )}
                <Input
                  id="cover_image_url"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple={false}
                  onChange={e => {
                    if (e.target.files?.[0]) {
                      setCauseImage(e.target.files?.[0]);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("cover_image_url")?.click()}
                >
                  Upload Image
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Cause"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// cause_participants
// id	UUID (PK)
// cause_id	UUID (FK to causes.id)
// user_id	UUID (FK to users.id)
// joined_at	TIMESTAMP

// TABLE causes (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   created_by UUID NOT NULL REFERENCES users(id),
//   neighborhood_id UUID REFERENCES neighborhoods(id),
//   title TEXT NOT NULL,
//   description TEXT NOT NULL,
//   cover_image_url TEXT,
//   category TEXT, -- e.g. 'environment', 'education', 'healthcare', etc.
//   tags TEXT[],
//   goal_type TEXT CHECK (goal_type IN ('volunteers', 'funding', 'awareness')) DEFAULT 'awareness',
//   goal_value INTEGER, -- e.g. volunteer count or funding goal
//   current_value INTEGER DEFAULT 0,
//   start_date TIMESTAMP NOT NULL,
//   end_date TIMESTAMP,
//   status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   deleted_at TIMESTAMP
// );
