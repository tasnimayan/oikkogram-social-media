"use client";

import fetchGraphql from "@/lib/fetchGraphql";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getNotifications } from "@/lib/queries";
import List from "./List";
import NotificationCard from "./NotificationCard";
import NotificationSkeleton from "./skeletons/NotificationSkeleton";

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
