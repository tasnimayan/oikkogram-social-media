
import React from 'react';

const Avatar = ({size=14, src='', border=true}:{size?:number,src:string, border?:boolean}) => {
  return (
    <div className={`relative rounded-full border-gray-300 ${border && 'border-2'} w-${size} h-${size}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gray-200 rounded-full border-2 border-white">
          <img
          src={src} alt=""
          className="w-full h-full object-cover rounded-full" />
      </div>
    </div>

  );
};

export default Avatar;