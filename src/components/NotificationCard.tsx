import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { FiUserPlus } from "react-icons/fi";
import { TbMessageCirclePlus } from "react-icons/tb";
import Avatar from './Avatar';


interface PropType {
  notificationType:string  //types can be 'new request' | 'new message'
}
interface notificationType{
  message?:string;
  icon?:IconType
}
const NotificationCard = ({notificationType}:PropType) => {
  let notification: notificationType = {};
  if(notificationType == 'new request'){
    notification.message="You have a new friend request"
    notification.icon = FiUserPlus
  }
  else{
    notification.message="You have a new message"
    notification.icon = TbMessageCirclePlus
  }
  
  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3 overflow-hidden">
      <Avatar
        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
      <div>
          <span className=' truncate'>{notification.message}</span>
      </div>
      <div>
        <notification.icon className='h-5 w-5'/>
      </div>
    </div>
  );
};

export default NotificationCard;