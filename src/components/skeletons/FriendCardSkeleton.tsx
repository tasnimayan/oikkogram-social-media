import React from "react";

const FriendCardSkeleton = () => {
  return (
    <div className="bg-white p-0.5">
      <div className="w-32 h-32 bg-gray-300 rounded-md"></div>
      <div className="w-24 h-2 bg-gray-300 rounded-md mt-2"></div>
    </div>
  );
};

export default FriendCardSkeleton;
