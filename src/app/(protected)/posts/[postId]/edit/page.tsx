"use client";
import UpdatePostForm from "@/components/forms/UpdatePostForm";
import Spinner from "@/components/Spinner";
import fetchGraphql from "@/lib/fetchGraphql";
import { PostType } from "@/lib/Interface";
import { getPostData } from "@/lib/queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const params = useParams();
  const { postId } = params;
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const fetchPost = async () => {
      const variables = {
        id: postId,
      };
      const response = await fetchGraphql(getPostData, variables);
      if (response.errors) {
        return toast.error("Something went wrong");
      }
      setPost(response?.data.post);
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!post) {
    return <Spinner className="mt-20" />;
  }

  return (
    <div className="border shadow bg-white rounded-lg px-2 py-4">
      <h4 className="text-center text-lg ">Edit Post</h4>
      <hr />
      <UpdatePostForm data={post} />
    </div>
  );
};

export default UpdatePost;
