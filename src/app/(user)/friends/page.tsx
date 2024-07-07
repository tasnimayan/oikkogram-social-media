import FriendCard from '@/components/FriendCard';
import FriendRequestCard from '@/components/FriendRequestCard';
import React from 'react';


const Notification = () => {
    return (
        <div>
            <h2>Friend Requests</h2>
            <div>
                <FriendRequestCard />
                {/* <p className='text-sm text-gray-300 text-center'>
                    No requests available
                </p> */}
            </div>

            <h2 className='mt-10'>Friend List</h2>

            <div className="">
                <FriendCard />
                <FriendCard />

            </div>
        </div>
    );
};

export default Notification;