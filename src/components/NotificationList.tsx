"use client";

import fetchGraphql from "@/utils/fetchGraphql";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "./Spinner";
import { getNotifications } from "@/utils/queries";
import List from "./List";
import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return await fetchGraphql(getNotifications);
    },
  });

  if (isLoading) return <Spinner className="p-6 mt-6" />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <div>
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
