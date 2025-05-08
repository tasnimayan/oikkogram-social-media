"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_NOTIFICATIONS } from "@/lib/api/queries";
import NotificationCard from "./notification-card";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";

const NotificationList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.NOTIFICATIONS],
    queryFn: async () => useFetchGql(GET_USER_NOTIFICATIONS, { limit: 10, offset: 0 }),
  });

  if (!isLoading) return <NotificationSkeleton />;
  if (isError) return <p>An error occurred</p>;
  if (!data?.data) return <p>Empty notification</p>;

  return (
    <div className="flex flex-col gap-y-2">
      {data.data.map((notification) => {
        return <NotificationCard notification={notification} />;
      })}
    </div>
  );
};

export default NotificationList;
