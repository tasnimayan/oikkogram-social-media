import React from "react";
import CreatePostCard from "@/components/CreatePostCard";

const AllPost = dynamic(()=>import("@/components/AllPost"))
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <>
      {/* Create Post Section */}
      <CreatePostCard />

      {/* Community Posts Section*/}
      <AllPost />
    </>
  );
};

export default Home;
