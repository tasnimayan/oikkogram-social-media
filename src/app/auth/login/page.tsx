"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    // Implement login logic (e.g., API call)
    console.log("Login data:", data);
    router.push("/"); // Redirect to home page after successful login
  };

  return (
    <div className="container mx-auto p-8 w-96 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="shadow-sm rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
