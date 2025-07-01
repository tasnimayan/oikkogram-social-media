"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useRouter } from "next/navigation";

type SignInForm = {
  email: string;
};

const SignInForm = () => {
  const router = useRouter();
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
        redirect: false,
      });

      if (result?.error) {
        router.push("/error");
      }
      if (result?.ok) {
        // Manually redirect to /verify
        router.push("/verify");
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

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loading className="size-auto" />} Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
