
'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

type FormData = {
  name:string;
  email: string;
  password: string;
  confirmPassword:string;
};

const UserForm = () => {
  const query = useSearchParams()
  const router = useRouter();

  const email = query.get('email')
  const token = query.get('token')

  if(!email || !token){
    return router.replace('/signup/404'); // Redirect to the default 404 error page
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit:SubmitHandler<FormData> = async (data) => {
    if(data.password !== data.confirmPassword){
      return toast.error('Password does not match.')
    }
    try {
      const URL = "https://fluent-wm.fssywp.easypanel.host/api/w/training/jobs/run_wait_result/f/u/tasnim/signup"
      const postBody = {
        name:data.name,
        email:email,
        password:data.password,
        token:token
      }
      const response = await axios.post(URL,postBody,{headers:{Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`}})
      if(response.data.status !== 'success'){
        return toast.error(response.data.message);
      }
      // store session cookie response.data.token
      Cookies.set("nextbuddy-token", response.data.token, { secure:true,expires: 60 });
      return router.push('/')      
    } catch (err) {
      toast.error("Something went wrong.")
      console.log(err)
    }
  };

  return (
    <div className="container mx-auto mb-auto p-8 w-96 shadow rounded-lg bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {required:true})}
            className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {required:true})}
            className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full px-8 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >Sign up</button>
        
      </form>
    </div>
  );
};

export default UserForm;
