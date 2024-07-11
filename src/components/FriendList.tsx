'use client'

import fetchGraphql from "@/utils/fetchGraphql";
import { getFriendRequests } from "@/utils/queries";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import List from "./List";
import FriendCard from "./FriendCard";

const FriendList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  let {data:session} = useSession()


  useEffect(()=>{
    const friendRequests = async () =>{
      const variables = {
        user_id: session?.user.id,
        status:'accepted'
      }
      try{
        let response = await fetchGraphql(getFriendRequests, variables)

        if(response.errors){
          return toast.error(response.errors[0].extensions.code);
        }
        setData(response.data?.friends)
        setLoading(false)
      }
      catch(err){
        console.log(err)
        setLoading(false)
        return null
      }
    }
    friendRequests()

  },[])

  if(loading){
    return <Spinner />
  }

  return (
    <div>
      <List data={data} component={FriendCard} emptyFallback={<p className='text-sm text-gray-300 text-center'>No friends available </p>}/>
    </div>
  );
};

export default FriendList;