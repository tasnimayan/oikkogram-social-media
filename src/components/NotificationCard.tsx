
import { IconType } from "react-icons";
import { FiUserPlus } from "react-icons/fi";
import { TbMessageCirclePlus } from "react-icons/tb";
import Avatar from "./Avatar";

interface dataType {
  id: number;
  is_read: boolean;
  type?: string;
  created_at?: string;
}
const NotificationCard = ({ data }: { data: dataType }) => {
  let notiIcon: IconType;
  let message: string;

  if (data.type == "new_friend") {
    message = "You have a new friend request";
    notiIcon = FiUserPlus;
  } else {
    message = "You have a new message";
    notiIcon = TbMessageCirclePlus;
  }

  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3 overflow-hidden">
      <Avatar src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
      <div>
        <span className=" truncate">{message}</span>
      </div>
      <div>
        <notiIcon />
      </div>
    </div>
  );
};

export default NotificationCard;
