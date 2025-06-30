"use client";
import React from "react";
import ProfileHeader from "./profile-header";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_PROFILE } from "@/lib/api/api-profile";
import ProfileFriendList from "./profile-friend-list";
import { useFetchGql } from "@/lib/api/graphql";
import { ResultOf } from "gql.tada";
import { Briefcase, Calendar, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QK } from "@/lib/constants/query-key";
import ProfileTabs from "./profile-tabs";
import { format } from "date-fns";
import { Loading } from "@/components/ui/loading";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

export type UserType = NonNullable<ResultOf<typeof GET_USER_PROFILE>["data"]>;

const ProfileIntro = ({ user }: { user: UserType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Gender</p>
              <p className="text-sm text-muted-foreground">{user.gender || "-"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Date of Birth</p>
              <p className="text-sm text-muted-foreground">
                {user.dob ? format(user.dob as string, "dd MMM yyyy") : "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm text-muted-foreground">{user.phone_number || "-"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Occupation</p>
              <p className="text-sm text-muted-foreground">{user.occupation || "-"}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{user.address || "-"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function ProfileContent({ profile }: { profile: UserType }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-4">
      <div className="space-y-4 hidden md:block">
        <ProfileIntro user={profile} />
        <ProfileFriendList />
      </div>
      <div>
        <ProfileTabs />
      </div>
    </div>
  );
}

function Profile() {
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
    <div className="scroll-container h-full">
      <div className="mx-auto max-w-5xl px-2 md:px-4 mb-8">
        <ProfileHeader user={profile} />
        <ProfileContent profile={profile} />
      </div>
    </div>
  );
}
export default Profile;
