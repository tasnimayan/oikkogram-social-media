'use client'
import fetchGraphql from "@/utils/fetchGraphql";
import { deletePost, recoverPost, trashPost } from "@/utils/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

const TrashOptions = ({postId}:{postId:number}) => {
  const [open, setOpen] = useState(false)
  const {data:session} = useSession()
  const userId = session?.user.id

  const queryClient = useQueryClient()

  const recoverPostMutation = useMutation({
    mutationFn: async () => {
      const variables = {
        id: postId,
      };
      return await fetchGraphql(recoverPost, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trash-posts', userId])
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: async () => {
      const variables = {
        id: postId,
      };
      return await fetchGraphql(deletePost, variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trash-posts', userId])
    },
  });




  const handleDelete = async () => {
    try{
      const response = deletePostMutation.mutate()
      console.log('delete res:', response)
      // if(response.errors){
      //   return toast.error('Could not delete post')
      // }
      // toast.success("Post Deleted")
    }
    catch(err){
      console.log(err)
      toast.error("Something is wrong")
    }
  }
  const handleRecover = async () => {
    try{
      const response = recoverPostMutation.mutate()
      console.log('recover res:', response)


      // if(response.errors){
      //   return toast.error('Could not delete post')
      // }
      // toast.success("Post Deleted")
    }
    catch(err){
      console.log(err)
      toast.error("Something is wrong")
    }
  }
  return (
    <div className="relative">
      <BsThreeDots className="cursor-pointer" onClick={()=>setOpen(!open)}/>
      <div className={`absolute top-1/2 right-0 bg-white border rounded-lg text-sm w-28 py-2 text-center ${open ? '':'hidden'}`}>
        <ul>
          <button 
            onClick={handleRecover}
            className=" inline-block hover:bg-green-100 w-full py-1">Recover post</button>
          <button 
            onClick={handleDelete}
            className="hover:bg-red-200 w-full py-1">Delete post</button>
        </ul>
      </div>
    </div>
  );
};

export default TrashOptions;