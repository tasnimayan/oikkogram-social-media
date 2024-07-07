// User post avatar box with options button
// Receives details as parameter which should be an object containing {name:str, time:str, isVerified:bool}

import { BsThreeDots } from "react-icons/bs";
import { AvatarType } from "@/utils/Interface";
import { AppProps } from "next/app";

const AvatarBox = ({details}) => {
    return (
    <div className="flex justify-between">
      <div className="flex space-x-3 items-center">
        <div className="w-10 h-10">
          <img
            alt="avatar"
            src={details.img ?? 'default.jpg'}
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <div className="">
          <div className="flex space-x-2 items-center">
            <p className="text-sm font-medium text-secondary-500">{details?.name}</p>
            {
              details?.isVerified? (
                <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              ) : null
            }

          </div>
          <p className="text-xs text-secondary-400">{details?.time}</p>
        </div>
      </div>

      <div>
        <BsThreeDots className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default AvatarBox;