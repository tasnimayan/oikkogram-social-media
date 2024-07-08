"use client"
import React from "react";
import CreatePostCard from "@/components/CreatePostCard";

const AllPost = dynamic(()=>import("@/components/AllPost"))
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const Home = () => {

  const {data:session } = useSession()

  console.log(session)
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
