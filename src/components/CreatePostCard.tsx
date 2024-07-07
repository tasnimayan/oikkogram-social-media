// This component is responsible for the Post creation card on Community Feed Page

import { CiImageOn, CiLocationOn  } from "react-icons/ci";

const CreatePostCard = () => {
  return (
    <section className="bg-white border rounded-lg mb-6 p-4">
      {/* First Row*/}
      <div className="flex gap-4">
        <div className="w-10 h-10">
          <img
            alt="avatar"
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <button name="message" className="w-full rounded-3xl ps-3 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg text-gray-400 text-left active:bg-gray-200">What's on your mind...</button>
      </div>

      {/* Second Row / Icons Row */}
      <div className="flex justify-between mt-3">
          <div className="flex gap-2">
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
          <button className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">Post</button>
      </div>
    </section>
  );
};

export default CreatePostCard;