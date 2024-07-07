import React from "react";
import SocialMenu from "./SocialMenu";
import ProfileAside from "./ProfileAside";

/* Left Column starts from here */
const LeftAside = () => {
  return (
      <div className="col-span-3 flex flex-col gap-4">
        <SocialMenu />
        <ProfileAside />
      </div>
  );
};

export default LeftAside;
