import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="container mx-auto mb-auto p-8 w-96 shadow rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
