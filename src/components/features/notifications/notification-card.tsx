import React from "react";
import { Avatar } from "../../ui/avatar";
import { ResultOf } from "gql.tada";
import { GET_USER_NOTIFICATIONS } from "@/lib/api/queries";
import Link from "next/link";
import { Bell, Heart, MessageSquareDiff, UserPlus2 } from "lucide-react";

const NotificationCard = ({ notification }: { notification: ResultOf<typeof GET_USER_NOTIFICATIONS>["data"] }) => {
  const Icon = () => {
    switch (notification.type) {
      case "connect_request":
        return <UserPlus2 />;
      case "comment":
        return <MessageSquareDiff />;
      case "like":
        return <Heart />;
      default:
        return <Bell />;
    }
  };

  return (
    <div
      className={`flex justify-between items-center gap-2 p-2 rounded-lg border ${
        notification.is_read ? "bg-white" : "bg-blue-50"
      }`}
    >
      <Link href={`/profile/${notification.sender.id}`} className="shrink-0">
        <Avatar src={notification.sender.image || "/placeholder.png"} />
      </Link>

      {/* Notification Message */}
      <div className="flex flex-col text-sm w-full overflow-hidden">
        <Link
          href={`/profile/${notification.sender.id}`}
          className="font-medium text-gray-800 truncate hover:underline"
        >
          {notification.sender.name}
        </Link>
        <p className="text-gray-600 truncate">{notification.message}</p>
        <span className="text-xs text-gray-400 mt-0.5">{new Date(notification.created_at).toLocaleString()}</span>
      </div>

      {/* Icon */}
      <div className="text-muted-foreground">{Icon()}</div>
    </div>
  );
};

export default NotificationCard;
