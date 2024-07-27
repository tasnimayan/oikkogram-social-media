"use client";
import { useSession } from "next-auth/react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/navigation";
const AuthWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Spinner />; // Create a new loading layout component
  }

  if (!session) {
    // return <p>Please login to your account</p>;
    router.replace("/auth/signin");
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;
