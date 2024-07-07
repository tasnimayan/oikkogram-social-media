import React from 'react';
import { GoPaperclip } from "react-icons/go";
import { LuSendHorizonal } from "react-icons/lu";
import { FaRegFaceSmile } from "react-icons/fa6";




const MessageForm = () => {
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <GoPaperclip className='h-5 w-5' />
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
          <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
            <FaRegFaceSmile className='h-5 w-5' />
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default MessageForm;