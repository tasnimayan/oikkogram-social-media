// User post avatar box with options button
// Receives details as parameter which should be an object containing {name:str, time:str, isVerified:bool}

import Avatar from "./Avatar";
import { BsGlobeAmericas } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";


const AvatarBox = ({details}:{details:{id:string,name?:string;image?:string;time?:string, privacy?:string}}) => {
    return (
    <div className="flex space-x-3 items-center">
      <Avatar
        src={details.image ?? 'default.jpg'}
        size={10}
      />

      <div className="">
        <div className="flex space-x-2 items-center">
          <p className="text-sm font-medium text-secondary-500">{details?.name}</p>
        </div>
        <div className="text-xs text-secondary-400">
          <span className="">{details?.time}</span>
          <span className="inline-block ms-2">{details.privacy == 'private' ? <IoIosLock />: <BsGlobeAmericas/> }</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarBox;