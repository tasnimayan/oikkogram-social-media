"use client";
import React, { Suspense, useState } from "react";
import CreatePostCard from "../CreatePostCard";
import ProfileHeader from "./ProfileHeader";
import SocialPost from "../SocialPost";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getUserPosts, getUserProfile } from "@/lib/queries";
import PostOptions from "@/components/menu/PostOptions";
import ProfileFriendList from "./ProfileFriendList";
import { PostType, UserType } from "@/lib/Interface";
import dynamic from "next/dynamic";
const UpdateProfile = dynamic(()=> import("./UpdateProfile"))

const fetchUserProfile = async (userId: string) => {
  const { data } = await fetchGraphql(getUserProfile, { user_id: userId });
  return data.user;
};

const fetchUserPosts = async (userId: string) => {
  const { data } = await fetchGraphql(getUserPosts, { user_id: userId });
  return data.posts;
};

interface UserProfile extends UserType{
  email:string
}
const ProfileIntro = ({ user }: { user: UserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  return(
    <div className="mr-12 mt-4">
      <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
        <div className="flex justify-between">
          <h4 className="font-bold text-xl">Intro</h4>
          <span onClick={() => setIsEditing(!isEditing)}
            className="flex items-center py-1 rounded-lg text-blue-500 font-semibold text-xs cursor-pointer hover:text-blue-700 ">
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
  )};

const PostList = React.memo(({ posts }: { posts: PostType[] }) => (
  <div className="posts-list">
    <h2 className="text-xl font-bold mb-2">Posts</h2>
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <SocialPost key={post.id} post={post} OptionsComponent={PostOptions} />
      ))}
    </div>
  </div>
));

function ProfileContent({
  userProfile,
  userPosts,
}: {
  userProfile: UserProfile;
  userPosts: PostType[];
}) {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center">
        <div>
          <ProfileIntro user={userProfile}/>
          <ProfileFriendList />
        </div>
        <div className="w-2/5">
          <CreatePostCard />
          <PostList posts={userPosts} />
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
  const { data: userPosts, isLoading: isUserPostLoading } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });

  if (isUserProfileLoading || isUserPostLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div className="">
      <div className="mt-14 border">
        <ProfileHeader user={userProfile} />
        <Suspense fallback={<div>Loading content...</div>}>
          <ProfileContent userProfile={userProfile} userPosts={userPosts} />
        </Suspense>
      </div>
    </div>
  );
}

export default Profile;
