"use client";

import { BasicInfoForm } from "@/components/features/profile/update/basic-info";
import { PersonalDetailsForm } from "@/components/features/profile/update/personal-details";
import { PreferencesForm } from "@/components/features/profile/update/preference-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Settings, Camera, Heart } from "lucide-react";

// Mock user data - replace with actual data fetching
const mockUserData = {
  user_id: "123e4567-e89b-12d3-a456-426614174000",
  first_name: "John",
  last_name: "Doe",
  user_name: "johndoe",
  bio: "Software developer passionate about creating amazing user experiences.",
  profile_photo_url: "/placeholder.svg?height=150&width=150",
  cover_photo_url: "/placeholder.svg?height=300&width=800",
  gender: "male",
  dob: "1990-01-15",
  phone_number: "+1234567890",
  occupation: "Software Developer",
  address: "123 Main St, City, State 12345",
  interests: ["Technology", "Photography", "Travel", "Music"],
  is_verified: false,
  trust_score: 85,
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

export default function ProfileUpdatePage() {
  return (
    <div className="container h-[calc(100vh-4rem)] mx-auto py-8 px-4 max-w-4xl">
      <ScrollArea className="h-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your profile information across different sections</p>
        </div>

        <div className="space-y-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Update your essential profile information that others will see</CardDescription>
            </CardHeader>
            <CardContent>
              <BasicInfoForm userData={mockUserData} />
            </CardContent>
          </Card>

          {/* Personal Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Personal Details
              </CardTitle>
              <CardDescription>Manage your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalDetailsForm userData={mockUserData} />
            </CardContent>
          </Card>

          {/* Interests & Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Interests & Preferences
              </CardTitle>
              <CardDescription>Add your interests to help others connect with you</CardDescription>
            </CardHeader>
            <CardContent>
              <PreferencesForm userData={mockUserData} />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
