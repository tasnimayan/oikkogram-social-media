import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { TbMessageCirclePlus } from "react-icons/tb";
import Avatar from "./Avatar";
import { NotificationType } from "@/lib/Interface";
import { FaBell } from "react-icons/fa";


const NotificationCard = ({ data }: { data: NotificationType }) => {
  const notificationDetails = getNotificationDetails(data.type);

  return (
    <div className="flex justify-between px-3 py-2 bg-white items-center gap-1 rounded-lg border border-gray-100 overflow-hidden">
      <Avatar src="" size={10} />
      <div>
        <span className="truncate">{notificationDetails.message}</span>
      </div>
      <div className=" text-black">
        <notificationDetails.icon />
      </div>
    </div>
  );
};

const getNotificationDetails = (type?: string) => {
  switch (type) {
    case "new_friend":
      return {
        message: "You have a new friend request",
        icon: FiUserPlus,
      };
    case "new_message":
      return {
        message: "You have a new message",
        icon: TbMessageCirclePlus,
      };
    default:
      return {
        message: "You have a new notification",
        icon:FaBell
      };
  }
};

export default NotificationCard;

