"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type SignInForm = {
  email: string;
  name?: string;
  photo?: string;
  // Add other fields as needed
};

const SignInForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      const result = await signIn("email", {
        email: data.email,
        callbackUrl: "/",
        redirect: false,
        ...(isNewUser && { name: data.name, photo: data.photo }),
      });

      if (result?.error === "EmailSignin") {
        // Email not found, show sign-up form
        setIsNewUser(true);
      } else if (!result?.error) {
        // Successful sign-in, redirect
        window.location.href = result?.url || "/";
      }
    } catch (err) {
      console.log(err);
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

      {isNewUser && (
        <>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: isNewUser })}
              className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block mb-1 text-sm font-medium">
              Photo URL
            </label>
            <input
              type="url"
              id="photo"
              {...register("photo")}
              className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full px-8 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        {isNewUser ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;

// 'use client'

// import { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { signIn } from 'next-auth/react';

// type FormData = {
//   email: string;
//   name?: string;
//   imageUrl?: string;
// };

// const LoginForm = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

//   const onSubmit:SubmitHandler<FormData> = async (data) => {
//     try {
//       await signIn('email', {
//         email: data.email,
//         name: data.name,
//         imageUrl: data.imageUrl,
//         callbackUrl: '/',
//         isSignUp: isSignUp
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {isSignUp && (
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-1 text-sm font-medium">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             {...register("name", { required: isSignUp })}
//             className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           {errors.name && (
//             <span className="text-red-500 text-sm">{errors.name.message}</span>
//           )}
//         </div>
//       )}
//       <div className="mb-4">
//         <label htmlFor="email" className="block mb-1 text-sm font-medium">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           {...register("email", { required: true })}
//           className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         />
//         {errors.email && (
//           <span className="text-red-500 text-sm">{errors.email.message}</span>
//         )}
//       </div>
//       {isSignUp && (
//         <div className="mb-4">
//           <label htmlFor="imageUrl" className="block mb-1 text-sm font-medium">
//             Image URL
//           </label>
//           <input
//             type="url"
//             id="imageUrl"
//             {...register("imageUrl")}
//             className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           {errors.imageUrl && (
//             <span className="text-red-500 text-sm">{errors.imageUrl.message}</span>
//           )}
//         </div>
//       )}
//       <button
//         type="submit"
//         className="w-full px-8 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
//       >
//         {isSignUp ? 'Sign Up' : 'Sign In'}
//       </button>
//       <button
//         type="button"
//         onClick={() => setIsSignUp(!isSignUp)}
//         className="w-full mt-2 px-8 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
//       >
//         {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
