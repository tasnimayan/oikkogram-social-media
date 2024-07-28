import React from 'react';

const UserCardSkeleton = () => {
  return (
    <>
      {[1,2].map((idx) => {
        return (
          <div
            key={idx}
            className="w-full rounded shadow-sm animate-pulse border my-1"
          >
            <div className="flex px-2 py-1 space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex-1 py-2 space-y-2">
                <div className=" w-20 h-3 rounded bg-gray-200"></div>
                <div className="w-16 h-2 rounded bg-gray-200"></div>
              </div>
            </div> 
          </div>
        );
      })}
    </>
  );
};

export default UserCardSkeleton;

