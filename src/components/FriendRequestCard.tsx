import React from 'react';
import Avatar from './Avatar';

const FriendRequestCard:React.FunctionComponent = () => {
  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
            <div className='flex items-center'>
                <Avatar 
                    src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg'
                />
                <div className='ms-4'>
                    <p>Ismail Hasan</p>
                    <p className='text-xs text-gray-400'>20 friends</p>
                </div>

            </div>
            
            <div className="flex gap-2 text-white text-sm">
              <button className='btn border  rounded px-2 py-1 bg-green-400'>
                  Confirm
              </button>
              <button className='btn border  rounded px-2 py-1 bg-red-400'>
                  Delete
              </button>
        </div>
        </div>
  );
};

export default FriendRequestCard;