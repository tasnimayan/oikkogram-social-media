import React from 'react';
import UserCard from './UserCard';

const ConversationList = () => {
  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[calc(100dvh-250px)] overflow-y-auto ">
      {
        [1,2,3].map(()=>{
          return (
            <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-1">
              <UserCard />
            </button>
          )
        })
      }
    </div>
  );
};

export default ConversationList;