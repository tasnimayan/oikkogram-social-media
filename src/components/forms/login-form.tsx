"use client";
import { useSession } from "@/context/SessionContext";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
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
  const { setSession } = useSession();

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await signIn("credentials", data);
      if (response?.error) {
        return toast.error(response.error);
      }
      console.log(response);
      // const sessionData = response?.;
      // setSession(sessionData);
      reset(); // to reset form inputs
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" variant="outline" className="w-full bg-blue-600 text-white">
              Login
            </Button>
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Need an account?
                <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
