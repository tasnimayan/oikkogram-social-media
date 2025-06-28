"use client";

import { useQuery } from "@tanstack/react-query";
import { GET_USER_NOTIFICATIONS } from "@/lib/api/queries";
import NotificationCard from "./notification-card";
import { useFetchGql } from "@/lib/api/graphql";
import { QK } from "@/lib/constants/query-key";
import NotificationSkeleton from "@/components/skeletons/notification-skeleton";
import { EmptyResult, ErrorResult } from "@/components/ui/data-message";

const NotificationList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QK.NOTIFICATIONS],
    queryFn: async () => useFetchGql(GET_USER_NOTIFICATIONS, { limit: 10, offset: 0 }),
  });

  if (isLoading) return <NotificationSkeleton />;
  if (isError) return <ErrorResult />;
  if (!data?.data) return <EmptyResult message="No notifications available" />;

  return (
    <div className="flex flex-col gap-y-2">
      {data.data.map(notification => {
        return <NotificationCard notification={notification} />;
      })}
    </div>
  );
};

export default NotificationList;
