"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../ui/form-field";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitEmail: SubmitHandler<FormData> = async data => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        return toast.error(result.error || "Could not login. Please try again.");
      }

      reset();
      return (window.location.href = "/");
    } catch (err) {
      toast.error("Could not login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-4">
      <FormField
        id="email"
        label="Email"
        register={register("email")}
        error={errors.email?.message}
        type="email"
        placeholder="Enter your email"
      />
      <FormField
        id="password"
        label="Password"
        register={register("password")}
        error={errors.password?.message}
        type="password"
        placeholder="password"
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-2 text-white rounded-md focus:outline-none bg-indigo-500 hover:bg-indigo-700"
      >
        {isLoading && <Loading className="size-auto" />} Login
      </Button>
    </form>
  );
};

export default LoginForm;
