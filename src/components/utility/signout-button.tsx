import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutBtn = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
      <LogOut className="size-4" />
      Sign out
    </Button>
  );
};

export default SignOutBtn;
