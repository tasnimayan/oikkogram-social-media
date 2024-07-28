"use client";

import dynamic from "next/dynamic";
import fetchGraphql from "@/lib/fetchGraphql";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/lib/queries";
const List = dynamic(() => import("./List"));
import NotificationCard from "./NotificationCard";
const NotificationSkeleton = dynamic(
  () => import("./skeletons/NotificationSkeleton")
);

const NotificationList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return await fetchGraphql(getNotifications);
    },
  });

  if (isLoading) return <NotificationSkeleton />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div className="flex flex-col gap-y-2">
      <List
        data={data.data?.notifications}
        component={NotificationCard}
        emptyFallback={
          <p className="text-sm text-gray-300 text-center">
            No friends available{" "}
          </p>
        }
      />
    </div>
  );
};

export default NotificationList;
