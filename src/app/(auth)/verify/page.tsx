'use client'
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const params = useSearchParams()
  let token = params.get('token')

  const url = `https://fluent-wm.fssywp.easypanel.host/api/w/training/jobs/run_wait_result/f/u/tasnim/verify-token?payload=eyJ0b2tlbiI6IiJ9&include_query=token&token=${token}`

  useEffect(()=>{
    (async ()=>{
      const {data} = await axios.get(url, {headers:{Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`}})
      if(data.status !== 'success'){
        return toast.error("Something went wrong")
      }
      
      const verification_token = data.data
      console.log(verification_token)
      router.replace(`/signup/user?email=${verification_token.identifier}&token=${verification_token.token}`)
    })()
  }, [token])
 

  // return router.replace('/signup/user?email=${data.email}')
  return (
    <>
      <p>Token is {token}</p>
      <p>redirect to sign up details form</p>
    </>
  ) 
  // return router.push('/')
};

export default page;