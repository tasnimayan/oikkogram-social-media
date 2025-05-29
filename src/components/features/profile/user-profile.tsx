"use client";
import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_PROFILE } from "@/lib/api/api-profile";
import ProfileFriendList from "./profile-friend-list";
import CreatePostCard from "../feed/create-post-card";
import PostCard from "../posts/post-card";
import { useFetchGql } from "@/lib/api/graphql";
import { ResultOf } from "gql.tada";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GET_USER_POSTS } from "@/lib/api/api-profile";
import { useSession } from "next-auth/react";
import LoadingIcon from "@/components/skeletons/loading-icon";
import { QK } from "@/lib/constants/query-key";
import ProfileTabs from "./ProfileTabs";
import UpdateProfile from "./UpdateProfile";

type PostType = ResultOf<typeof GET_USER_POSTS>["data"];

export type UserType = NonNullable<ResultOf<typeof GET_USER_PROFILE>["data"]>;

const ProfileIntro = ({ user }: { user: UserType }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Details</h4>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      {isEditing ? (
        <UpdateProfile user={user} />
      ) : (
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="font-medium">👤 Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">📧 Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

const PostList = React.memo(({ posts }: { posts: PostType }) => (
  <div className="posts-list">
    <h2 className="text-xl font-bold mb-2">Posts</h2>
    <div className="flex flex-col gap-6">
      {posts.map(post => (
        <PostCard post={post} />
      ))}
    </div>
  </div>
));

function ProfileContent({ profile, posts }: { profile: UserType; posts: PostType }) {
  const params = useParams();
  const { data: session } = useSession();

  const userId = params.userId as string;
  const isMineProfile = userId === session?.user?.id;

  return (
    <>
      <ProfileTabs />

      <div className="grid grid-cols-[20rem_1fr] gap-4 p-4">
        <div className="space-y-4 hidden md:block">
          <ProfileIntro user={profile} />
          <ProfileFriendList />
        </div>
        <div className="space-y-4">
          {isMineProfile && <CreatePostCard />}
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

function Profile() {
  const params = useParams();
  const userId = params.userId as string;

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: [QK.PROFILE, { userId }],
    queryFn: () => useFetchGql(GET_USER_PROFILE, { user_id: userId }),
  });
  const { data, isLoading: isUserPostLoading } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => useFetchGql(GET_USER_POSTS, { user_id: userId }),
  });

  if (isProfileLoading || isUserPostLoading) return <LoadingIcon />;
  if (!profile) return <div>User not found</div>;
  if (!profile.data || !data?.data) return <p>User not found</p>;

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="scroll-container h-full">
        <div className="mx-auto max-w-5xl">
          <ProfileHeader user={profile.data} />
          <ProfileContent profile={profile.data} posts={data.data} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
