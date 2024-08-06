"use client";
import CreatePostCard from "../CreatePostCard";
import ProfileHeader from "./ProfileHeader";
import SocialPost from "../SocialPost";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchGraphql from "@/lib/fetchGraphql";
import { getUserProfile, getUserPosts } from "@/lib/queries";
import PostOptions from "@/components/menu/PostOptions";
import ProfileFriendList from "./ProfileFriendList";
import { PostType } from "@/lib/Interface";

const fetchUserProfile = async (userId: string) => {
  const { data } = await fetchGraphql(getUserProfile, { user_id: userId });
  return data.user;
};
const fetchUserPosts = async (userId: string) => {
  const { data } = await fetchGraphql(getUserPosts, { user_id: userId });
  return data.posts;
};

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

  if (isUserProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div className="">
      <div className="mt-14 border">
        <ProfileHeader user={userProfile} />
        {/* // CONTENT */}
        <div>
          <div className="bg-gray-100 ">
            <div className="flex justify-center">
              {/* LEFT */}
              <div>
                {/* Profile Intro */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80"
                    id="intro"
                  >
                    <h1 className="font-bold text-xl">Intro</h1>
                  </div>
                </div>

                <ProfileFriendList />
              </div>
              {/* END LEFT */}

              {/* // POST LIST */}
              <div className="w-2/5">
                <CreatePostCard />

                {/* POST */}
                <div className="posts-list">
                  <h2 className="text-xl font-bold mb-2">Posts</h2>
                  <div className="flex flex-col gap-6">
                    {userPosts.map((post: PostType) => {
                      return (
                        <SocialPost
                          key={post.id}
                          post={post}
                          OptionsComponent={PostOptions}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
