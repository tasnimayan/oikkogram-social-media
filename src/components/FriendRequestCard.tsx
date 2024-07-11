import React from 'react';
import Avatar from './Avatar';
import RequstOptionButton from './buttons/RequstOptionButton';

interface dataType {
    status: string;
    user: {
        image: string | null,
        name: string | null,
        id: string
    }
}

const FriendRequestCard = ({data}:dataType) => {
  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
            <div className='flex items-center'>
                <Avatar 
                    src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg'
                />
                <div className='ms-4'>
                    <p>{data.user?.name}</p>
                    <p className='text-xs text-gray-400'>20 friends</p>
                </div>

            </div>
            
            <div className="flex gap-2 text-white text-sm">
                {/* Create Button Component and use it */}
                <RequstOptionButton buttonType='confirm' id={data.user?.id}>
                    Confirm
                </RequstOptionButton>
                <RequstOptionButton buttonType='delete' id={data.user?.id}>
                    Remove
                </RequstOptionButton>
            </div>
        </div>
  );
};

export default FriendRequestCard;