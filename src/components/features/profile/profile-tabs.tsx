import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostCard from "../feed/create-post-card";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_POSTS } from "@/lib/api/api-profile";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import { Loading } from "@/components/ui/loading";
import PostCard from "../posts/post-card";
import React from "react";
import UserCauseList from "../cause/user-cause-list";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

const PostList = () => {
  const params = useParams();
  const userId = params.userId as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QK.POSTS, { userId }],
    queryFn: () => useFetchGql(GET_USER_POSTS, { user_id: userId }),
    enabled: !!userId,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorResult />;
  if (!data?.data.length) return <EmptyResult message="No post available" />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Posts</h2>
      <div className="flex flex-col gap-6">
        {data?.data.map(post => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

const ProfileTabs = () => {
  const params = useParams();
  const { data: session } = useSession();

  const userId = params.userId as string;
  const isMineProfile = userId === session?.user?.id;

  return (
    <div className="w-full ">
      <Tabs defaultValue="posts" className="py-1.5">
        <div className="flex justify-end">
          <TabsList className="space-x-2 rounded-full bg-white border">
            <TabsTrigger
              value="posts"
              className="px-6 rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-foreground"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="causes"
              className="px-6 rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-foreground"
            >
              Causes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="posts">
          {isMineProfile && <CreatePostCard />}
          <PostList />
        </TabsContent>
        <TabsContent value="causes">
          <UserCauseList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
