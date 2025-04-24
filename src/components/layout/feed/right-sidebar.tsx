import React from "react";
import { UpcomingEvents } from "../../features/feed/upcoming-events";

const RightAside = () => {
  return (
    <div className="w-full space-y-4">
      <NeighborhoodInfo />
      <UpcomingEvents />
    </div>
  );
};

export default RightAside;

function NeighborhoodInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h3 className="font-semibold text-lg mb-2">Parkside Community</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">A friendly neighborhood with 342 active members</p>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>5 miles radius</span>
        <span>•</span>
        <span>Joined Apr 2023</span>
      </div>
    </div>
  );
}
