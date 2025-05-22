
'use client'
import { useSession } from '@/context/SessionContext';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const {setSession} = useSession()

  const onSubmit:SubmitHandler<FormData> = async (data) => {
    try {
      const URL = `https://fluent-wm.fssywp.easypanel.host/api/w/training/jobs/run_wait_result/f/u/tasnim/login`
      const response = await axios.post(URL, data, {headers:{Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`}})
      if(response.data.status !== 'success'){
        return toast.error(response.data.message)
      }
      const sessionData = response.data?.data
      setSession(sessionData)
      reset(); // to reset form inputs

    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
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
      
      <button
        type="submit"
        className="w-full px-8 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        Login
      </button>
      <div className='text-center mt-3 text-sm'>
        <p>Need an account? <a href='/signup' className='text-blue-500 hover:underline'>Sign up</a></p>
      </div>
    </form>
  );
};

export default LoginForm;
