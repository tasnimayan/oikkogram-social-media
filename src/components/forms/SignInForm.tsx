"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type SignInForm = {
  email:string
}

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();

  const onSubmit:SubmitHandler<SignInForm>  = async (data) => {
    try{
      await signIn('email', {email:data.email, callbackUrl:'/'})
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

export default SignInForm;
