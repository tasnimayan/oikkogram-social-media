"use client";
import React, { Suspense, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { GET_USER_POSTS, getUserProfile } from "@/lib/api/queries";
import PostOptions from "@/components/features/posts/post-options";
import ProfileFriendList from "./ProfileFriendList";
import { UserType } from "@/lib/Interface";
import dynamic from "next/dynamic";
import CreatePostCard from "../features/feed/create-post-card";
import PostCard from "../features/posts/post-card";
import { useFetchGql } from "@/lib/api/graphql";
import { ResultOf } from "gql.tada";
import { Loader2 } from "lucide-react";
const UpdateProfile = dynamic(() => import("./UpdateProfile"));

const fetchUserProfile = async (userId: string) => {
  const { data } = await fetchGraphql(getUserProfile, { user_id: userId });
  return data.user;
};

type PostType = ResultOf<typeof GET_USER_POSTS>["posts"];

interface UserProfile extends UserType {
  email: string;
}
const ProfileIntro = ({ user }: { user: UserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mr-12 mt-4">
      <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
        <div className="flex justify-between">
          <h4 className="font-bold text-xl">Intro</h4>
          <span
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center py-1 rounded-lg text-blue-500 font-semibold text-xs cursor-pointer hover:text-blue-700 "
          >
            Edit Profile
          </span>
        </div>

        {isEditing ? (
          <UpdateProfile user={user} />
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PostList = React.memo(({ posts }: { posts: PostType }) => (
  <div className="posts-list">
    <h2 className="text-xl font-bold mb-2">Posts</h2>
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard post={post} OptionsComponent={PostOptions} />
      ))}
    </div>
  </div>
));

function ProfileContent({ userProfile, posts }: { userProfile: UserProfile; posts: PostType }) {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <div>
          <ProfileIntro user={userProfile} />
          <ProfileFriendList />
        </div>
        <div className="w-2/5">
          <CreatePostCard />
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const params = useParams();
  const userId = params.userId as string;

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile(userId),
  });
  const { data, isLoading: isUserPostLoading } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => useFetchGql(GET_USER_POSTS, { user_id: userId }),
  });

  if (isUserProfileLoading || isUserPostLoading) return <Loader2 className="animate-spin" />;
  if (!userProfile) return <div>User not found</div>;
  if (!data?.posts) return <p>No Post Available</p>;

  return (
    <div className="">
      <div className="mt-14 border">
        <ProfileHeader user={userProfile} />
        <Suspense fallback={<div>Loading content...</div>}>
          <ProfileContent userProfile={userProfile} posts={data.posts} />
        </Suspense>
      </div>
    </div>
  );
}

export default Profile;
