"use client"

// This component is responsible for fetching all post of user
import React, { useEffect, useState } from 'react';
import SocialPost from './SocialPost';
import fetchGraphql from '@/utils/fetchGraphql';
import { getAllPost } from '@/utils/queries';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const AllPost = () => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    const getPosts = async (limit?:number, page?:number)=> {
      try {
        let variables = {
          limit: limit,
          offset: page
        }
        const response = await fetchGraphql(getAllPost, variables)
        if(response.errors){
          setLoading(false)
          return toast.error(response.errors[0].extensions.code);
        }
        
        setPosts(response.data.posts)
        setLoading(false)
      }
      catch(err){
        console.error('Error Fetching Data:', err);
        setLoading(false)
      }
    }
    getPosts()

  },[])

  if(loading){
    return <Spinner />
  }

  return (
    <div className="flex flex-col gap-6">
      {posts?.map((post) => {
        return <SocialPost key={post.id} post={post}/>;
      })}
    </div>
  );
};

export default AllPost;