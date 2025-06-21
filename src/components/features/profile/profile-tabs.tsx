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
import { ResultOf } from "gql.tada";
import React from "react";

type PostType = ResultOf<typeof GET_USER_POSTS>["data"];

const PostList = React.memo(({ posts }: { posts: PostType }) => (
  <div>
    <h2 className="text-xl font-bold mb-2">Posts</h2>
    <div className="flex flex-col gap-6">
      {posts.map(post => (
        <PostCard post={post} />
      ))}
    </div>
  </div>
));

const ProfileTabs = () => {
  const params = useParams();
  const { data: session } = useSession();

  const userId = params.userId as string;
  const isMineProfile = userId === session?.user?.id;

  const { data, isLoading: isUserPostLoading } = useQuery({
    queryKey: [QK.POSTS, { userId }],
    queryFn: () => useFetchGql(GET_USER_POSTS, { user_id: userId }),
  });

  if (isUserPostLoading) return <Loading />;
  if (!data) return <div>Posts not found</div>;

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
          <PostList posts={data?.data} />
        </TabsContent>
        <TabsContent value="causes">Causes</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
