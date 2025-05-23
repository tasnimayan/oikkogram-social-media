import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <button
      onClick={handleSignOut}
      className="border shadow-sm rounded-md px-3 py-2 hover:bg-gray-100 text-nowrap"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
