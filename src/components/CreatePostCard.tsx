// This component is responsible for the Post creation card on Community Feed Page

"use client"
import dynamic from "next/dynamic";
import { useRef } from "react";
import Avatar from "./Avatar";
import { useSessionContext } from "@/app/(protected)/AuthWrapper";
const PostCreateForm = dynamic(()=>import("./forms/PostCreateForm"))

const CreatePostCard = () => {
  const modalRef = useRef<any>(null);

  const toggleModal = () => {
    modalRef.current.open = true;
  };
  const {user} = useSessionContext()

  return (
    <section className="bg-white border rounded-lg mb-6 p-4">
      {/* First Row*/}
      <div className="flex gap-4">
        <div className="w-10 h-10">
          <Avatar
            src={user?.image}
            size={10}
          />
        </div>
        <button className="w-full rounded-3xl ps-3 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg text-gray-400 text-left active:bg-gray-200" onClick={toggleModal}>What's on your mind...</button>
      </div>
      <PostCreateForm modalRef={modalRef}/>

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