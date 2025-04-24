"use client";
import fetchGraphql from "@/lib/fetchGraphql";
import { trashPost } from "@/lib/queries";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

const PostOptions = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetchGraphql(trashPost, { id: postId });
      if (response.errors) {
        return toast.error("Could not delete post");
      }
      toast.success("Post Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Something is wrong");
    }
  };
  return (
    <div className="relative">
      <BsThreeDots className="cursor-pointer" onClick={() => setOpen(!open)} />
      <div className={`absolute top-1/2 right-0 bg-white border rounded-lg text-sm w-28 py-2 text-center ${open ? "" : "hidden"}`}>
        <ul>
          <Link href={`/post/${postId}/edit`} className=" inline-block hover:bg-gray-100 w-full py-1">
            Edit post
          </Link>
          <button onClick={handleDelete} className="hover:bg-red-200 w-full py-1">
            Delete post
          </button>
        </ul>
      </div>
    </div>
  );
};

export default PostOptions;
