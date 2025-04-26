import dynamic from "next/dynamic";
const NotificationList = dynamic(() => import("@/components/NotificationList"));

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
