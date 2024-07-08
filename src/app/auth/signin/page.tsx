"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data:{name?:string;email:string}) => {
    try{
      await signIn('email', {email:data.email})
    }
    catch(err){
      console.log(err)
    }
    // router.push("/"); // Redirect to home page after successful login
  };

  return (
    <div className="container mx-auto p-8 w-96 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: false })}
            className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
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
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
