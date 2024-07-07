import React from "react";
import SocialMenu from "@/components/SocialMenu";
import ProfileAside from "@/components/ProfileAside";
import CreatePostCard from "@/components/CreatePostCard";
import SocialPost from "@/components/SocialPost";
import PopularProfiles from "@/components/PopularProfiles";
import Following from "@/components/Following";

const Home = () => {
  return (
    <>
      {/* Left Column starts from here */}
      <div className="col-span-3 flex flex-col gap-4">
        <SocialMenu />
        <ProfileAside />
      </div>

      {/* Middle columns starts from here */}
      <div className="col-span-6">
        {/* Create Post Section */}
        <CreatePostCard />

        {/* Community Posts Section*/}
        <div className="flex flex-col gap-6">
          {[2, 5, 3].map((item) => {
            return <SocialPost key={item} />;
          })}
        </div>
      </div>

      {/* Third Column starts from here */}
      <div className="col-span-3 relative">
        {/* right sidebar content here */}
        <div className="w-full space-y-4">
          <PopularProfiles />
          <Following />
        </div>
      </div>
    </>
  );
};

export default Home;
