import CreatePostCard from "@/components/features/feed/create-post-card";
import dynamic from "next/dynamic";
const PostList = dynamic(() => import("@/components/features/feed/post-list"));

const Home = () => {
  return (
    <>
      <CreatePostCard />
      <PostList />
    </>
  );
};

export default Home;
