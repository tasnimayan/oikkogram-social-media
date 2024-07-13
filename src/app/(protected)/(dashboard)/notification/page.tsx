import NotificationCard from "@/components/NotificationCard";
import NotificationList from "@/components/NotificationList";
import React from "react";

const Notification = () => {
  return (
    <div>
      <div className="max-w-lg mx-auto items-center h-screen">
        <h2>Notifications</h2>
        <NotificationList />
      </div>
    </div>
  );
};

export default Notification;
