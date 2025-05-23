import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutBtn = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} className="w-full">
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
};

export default SignOutBtn;
