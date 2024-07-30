import LoginForm from "@/components/forms/LoginForm";
import SignInForm from "@/components/forms/SignInForm";

const Signup = () => {
  return (
    <div className="container mx-auto mb-auto p-8 w-96 shadow rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Sign In with email</h1>
      {/* <SignInForm /> */}
      <LoginForm />
    </div>
  );
};

export default Signup;
