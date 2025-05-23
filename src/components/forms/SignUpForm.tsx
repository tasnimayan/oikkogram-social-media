"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import axios from "axios";
import { headers } from "next/headers";

type SignUpForm = {
  email:string
}

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();

  console.log(process.env.NEXT_PUBLIC_API_AUTH_TOKEN)
  const onSubmit:SubmitHandler<SignUpForm>  = async (data) => {
    try{
      const URL = `https://fluent-wm.fssywp.easypanel.host/api/w/training/jobs/run_wait_result/f/u/tasnim/verification-token?payload=eyJlbWFpbCI6IiJ9&include_query=email&email=${data.email}`
      // Call sign up link to create user token
      const response = await axios.get(URL, {headers:{Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`}})
      console.log(response)
    }
    catch(err){
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
      <button
        type="submit"
        className="w-full px-8 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignUpForm;
