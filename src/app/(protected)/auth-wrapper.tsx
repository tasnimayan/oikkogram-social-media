"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";

const AuthWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (!session) router.replace("/login");

  return children;
};

export default AuthWrapper;
