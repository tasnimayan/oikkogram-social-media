"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

type SignInForm = {
  email: string;
};

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn("email", {
        email: data.email,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to send verification email. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={`shadow-sm rounded-md w-full px-3 py-2 text-sm border ${
            errors.email ? "border-red-300" : "border-gray-300"
          } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Enter your email"
          disabled={isLoading}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-8 py-2 text-white rounded-md focus:outline-none ${
          isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-700"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
