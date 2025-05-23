
import SignUpForm from "@/components/forms/SignUpForm";
const SignUp = () => {
  return (
    <div className="container mx-auto mb-auto p-8 w-96 shadow rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Sign up with email</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
