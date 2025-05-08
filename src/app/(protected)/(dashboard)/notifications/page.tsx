import NotificationList from "@/components/features/notifications/notification-list";
import dynamic from "next/dynamic";

const Notification = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>
      <NotificationList />
    </div>
  );
};

export default Notification;
