import dynamic from "next/dynamic";

import CreatePostCard from "@/components/CreatePostCard";
const AllPost = dynamic(() => import("@/components/AllPost"));

const Home = () => {
  return (
    <>
      {/* Create Post Section */}
      <CreatePostCard />

      {/* Public Posts Section*/}
      <AllPost />
    </>
  );
};

export default Home;
