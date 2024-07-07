// This component is responsible for the Post creation card on Community Feed Page

import Avatar from "./Avatar";


const CreatePostCard = () => {
  return (
    <section className="bg-white border rounded-lg mb-6 p-4">
      {/* First Row*/}
      <div className="flex gap-4">
        <div className="w-10 h-10">
          <Avatar
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            size={10}
          />
        </div>
        <button name="message" className="w-full rounded-3xl ps-3 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg text-gray-400 text-left active:bg-gray-200">What's on your mind...</button>
      </div>

      {/* Second Row / Icons Row */}
      <div className="flex justify-between mt-3 px-6 border-t pt-2">
          <div className=" bg-blue-100 px-2 rounded text-gray-600 cursor-pointer">
            Activity</div>
          <div className="bg-blue-100 px-2 rounded text-gray-600 cursor-pointer">
            Photo</div>
          <div className="bg-blue-100 px-2 rounded text-gray-600 cursor-pointer">
              Feeling
          </div>
      </div>
    </section>
  );
};

export default CreatePostCard;