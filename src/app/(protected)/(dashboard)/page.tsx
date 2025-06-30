import CreatePostCard from "@/components/features/feed/create-post-card";
import PostList from "@/components/features/feed/post-list";

const Home = () => {
  return (
    <div className="mb-4">
      <CreatePostCard />
      <PostList />
    </div>
  );
};

export default Home;
