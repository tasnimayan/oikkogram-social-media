"use client";
import React from "react";
import ProfileHeader from "./profile-header";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_PROFILE } from "@/lib/api/api-profile";
import ProfileFriendList from "./profile-friend-list";
import { useFetchGql } from "@/lib/api/graphql";
import { ResultOf } from "gql.tada";
import { Briefcase, Calendar, MapPin, Pencil, Phone, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LoadingIcon from "@/components/skeletons/loading-icon";
import { QK } from "@/lib/constants/query-key";
import ProfileTabs from "./profile-tabs";
import Link from "next/link";
import { format } from "date-fns";

export type UserType = NonNullable<ResultOf<typeof GET_USER_PROFILE>["data"]>;

const ProfileIntro = ({ user }: { user: UserType }) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Details</h4>
        <Link
          href={`/profile/${user.id}/update`}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      </div>

      <CardContent className="space-y-4">
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
    <div className="grid grid-cols-[20rem_1fr] gap-4">
      <div className="space-y-4 hidden md:block">
        <ProfileIntro user={profile} />
        <ProfileFriendList />
      </div>
      <div className="space-y-4">
        <ProfileTabs />
      </div>
    </div>
  );
}

function Profile() {
  const params = useParams();
  const userId = params.userId as string;

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: [QK.PROFILE, { userId }],
    queryFn: () => useFetchGql(GET_USER_PROFILE, { user_id: userId }),
  });

  if (isProfileLoading) return <LoadingIcon />;
  if (!profile) return <div>User not found</div>;
  if (!profile.data) return <p>User not found</p>;

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="scroll-container h-full">
        <div className="mx-auto max-w-5xl">
          <ProfileHeader user={profile.data} />
          <ProfileContent profile={profile.data} />
        </div>
      </div>
    </div>
  );
}
export default Profile;
