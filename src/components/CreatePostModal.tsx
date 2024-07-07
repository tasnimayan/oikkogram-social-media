import React from 'react';
import { ImCancelCircle } from "react-icons/im";
import { CiImageOn, CiLocationOn  } from "react-icons/ci";

const CreatePostModal = () => {
  return (
  <dialog className="realtive border shadow rounded-lg w-2/5 px-2 py-4" role="dialog" aria-modal="true">
    <button className="absolute top-4 right-4 text-red-600 text-2xl w-5 h-5 ">
    <ImCancelCircle />
    </button>
    <div>
      <h4 className="text-center text-lg ">Create Post</h4>
      <hr />
      <textarea placeholder="What's on your mind?" rows={8} className="w-full border-none focus:outline-none"/>

      <div className="flex gap-2 border rounded-lg px-4 py-1 justify-end mt-2">
          <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
            <CiImageOn />
          </span>
          <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
            <CiLocationOn />
          </span>
          <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          </span>
      </div>
      <button className="w-full text-center py-2 px-4 mt-2 rounded-lg text-sm bg-blue-600 text-white shadow-lg active:bg-blue-400">Post</button>
    </div>
  </dialog>
  );
};

export default CreatePostModal;