"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_PROFILE } from "@/lib/api/api-profile";
import { Loading } from "@/components/ui/loading";
import { QK } from "@/lib/constants/query-key";
import { useFetchGql } from "@/lib/api/graphql";
import { PersonalDetailsForm } from "@/components/features/profile/update/personal-details";
import { PreferencesForm } from "@/components/features/profile/update/preference-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Heart } from "lucide-react";
import { BasicInfoForm } from "@/components/features/profile/update/basic-info";
import { ResultOf } from "gql.tada";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

export type ProfileType = NonNullable<ResultOf<typeof GET_USER_PROFILE>["data"]>;

export default function ProfileUpdatePage() {
  const params = useParams();
  const userId = params.userId as string;

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QK.PROFILE, { userId }],
    queryFn: () => useFetchGql(GET_USER_PROFILE, { user_id: userId }),
    select: data => data.data,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorResult />;
  if (!profile) return <EmptyResult />;

  return (
    <div className="py-8 px-4 scroll-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your profile information</p>
        </div>

        <div className="space-y-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BasicInfoForm profile={profile} />
            </CardContent>
          </Card>

          {/* Personal Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalDetailsForm profile={profile} />
            </CardContent>
          </Card>

          {/* Interests & Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Interests & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PreferencesForm profile={profile} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
