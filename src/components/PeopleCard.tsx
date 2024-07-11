import React from 'react';
import Avatar from './Avatar';
import AddFriendButton from './buttons/AddFriendButton';

const PeopleCard= ({people}:{people:{id:string, image:string,name:string}}) => {
  return (
    <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
      <div className='flex items-center'>
        <Avatar 
          src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg'
        />
        <div className='ms-4'>
            <p>{people?.name}</p>
            <p className='text-xs text-gray-400'>20 friends</p>
        </div>
      </div>
      
      <div className="flex gap-2 text-white text-sm">
        <AddFriendButton friendId={people?.id}/>
      </div>
    </div>
  );
};

export default PeopleCard;