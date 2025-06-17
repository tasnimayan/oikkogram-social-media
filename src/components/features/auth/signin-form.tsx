"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

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

  const onSubmit: SubmitHandler<SignInForm> = async data => {
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
      <FormField
        id="email"
        label="Email"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={errors.email?.message}
        type="email"
        placeholder="Enter your email"
      />

      {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-2 text-white rounded-md focus:outline-none bg-indigo-500 hover:bg-indigo-700"
      >
        {isLoading && <Loading className="size-auto" />} Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
