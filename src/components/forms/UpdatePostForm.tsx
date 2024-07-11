'use client'
import React, { useState } from 'react';
import { CiImageOn  } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import fetchGraphql from '@/utils/fetchGraphql';
import toast from 'react-hot-toast';
import { updatePost } from '@/utils/queries';
import { PostType } from '@/utils/Interface';
import { useRouter } from 'next/navigation';

const UpdatePostForm = ({data}:{data:PostType}) => {
  const router = useRouter()
  const {register, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      privacy:data.privacy,
      content:data.content,
    }
  })
  const [loading, setLoading] = useState(false)
  const postId = data.id
  const onSubmit = async (data)=> {
    setLoading(true)
    let variables = {
      id: postId,
      content: data.content,
      privacy: data.privacy,
    }
    try {
      const response = await fetchGraphql(updatePost, variables)
      if(response.errors || !response.data.post){
        setLoading(false)
        return toast.error(response.errors[0].extensions.code);
      }
      
      toast.success('Post Updated');
      reset();
      setLoading(false)
      router.replace('/')
    }
    catch(err){
      console.error('Error posting data:', err);
      alert('Failed to create post');
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='pt-1'>
        <label htmlFor="privacy" className='text-sm mr-2'>Privacy</label>
        <select {...register("privacy")} id="privacy" className='border rounded text-sm px-2 py-1 '>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <textarea
        {...register('content', {required:true})}
        placeholder="What's on your mind?" 
        rows={8} 
        className="w-full border-none focus:outline-none mt-2 bg-gray-50 rounded-lg"/>

      <div className="flex gap-2 border rounded px-4 py-1 justify-end mt-2">
        <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-gray-700 cursor-pointer">
          <CiImageOn />
        </span>
      </div>
      <button className="w-full text-center py-2 px-4 mt-2 rounded-lg text-sm bg-blue-600 text-white shadow-lg active:bg-blue-400" type='submit'>{loading ? 'Wait . . .' : 'Update'}</button>     
    </form>
  );
};

export default UpdatePostForm;