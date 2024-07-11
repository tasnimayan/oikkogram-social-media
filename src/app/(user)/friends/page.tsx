
import FriendList from '@/components/FriendList';
import FriendRequstList from '@/components/FriendRequstList';

import React from 'react';


const Notification = () => {
  return (
    <div>
      <h2>Friend Requests</h2>
      <FriendRequstList />

      <h2 className='mt-10'>Friend List</h2>
      <FriendList />
    </div>
  );
};

export default Notification;