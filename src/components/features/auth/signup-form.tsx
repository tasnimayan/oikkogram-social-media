"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../ui/button";
import { FormField } from "../../ui/form-field";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "At least 2 characters." }),
  lastName: z.string().min(2, { message: "At least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignupForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      const { firstName, lastName, email, password } = values;
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      return response.json();
    },
    onSuccess: () => {
      reset();
      router.push("/login");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutate(values);
  }

  return (
    <div className="min-h-dvh border-2 border-red-500 flex justify-center bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl h-fit">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Join Oikkogram</CardTitle>
          <CardDescription className="text-gray-500">Create your account and connect with neighbors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="firstName"
                label="First name"
                register={register("firstName")}
                error={errors.firstName?.message}
                placeholder="first name"
              />
              <FormField
                id="lastName"
                label="Last name"
                register={register("lastName")}
                error={errors.lastName?.message}
                placeholder="last name"
              />
            </div>

            <FormField
              id="email"
              label="Email"
              register={register("email")}
              error={errors.email?.message}
              type="email"
              placeholder="email"
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
              variant="outline"
              className="w-full px-8 py-2 text-white rounded-md focus:outline-none bg-indigo-500 hover:bg-indigo-700"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
