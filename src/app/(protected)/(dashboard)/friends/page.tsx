import dynamic from "next/dynamic";
const FriendList = dynamic(() => import("@/components/FriendList"));
const FriendRequstList = dynamic(() => import("@/components/FriendRequstList"));

const Notification = () => {
  return (
    <div>
      <h2>Friend Requests</h2>
      <FriendRequstList />

      <h2 className="mt-10">Friend List</h2>
      <FriendList />
    </div>
  );
};

export default Notification;
