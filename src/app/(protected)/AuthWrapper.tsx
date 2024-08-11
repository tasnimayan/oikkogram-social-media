"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import MainLoader from "@/components/skeletons/MainLoader";
import { Session } from "next-auth";

const SessionContext = createContext<Session | null>(null);
// Session hook for session variable data

export const useSessionContext = (): Session => {
  const context = useContext(SessionContext);
  if (context === null || context === undefined) {
    throw new Error("Must log in to use Session");
  }
  return context;
};
const AuthWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { data: session, status, update } = useSession();
  const [updatedSession, setUpdatedSession] = useState<Session | null>(null);
  const router = useRouter();

  const refreshSession = useCallback(async () => {
    const refreshedSession = await update();
    setUpdatedSession(refreshedSession as Session);
  }, [update]);

  useEffect(() => {
    if (session) {
      refreshSession();
    }
  }, []);

  if (status === "loading") {
    return <MainLoader />;
  }

  if (!session) {
    router.replace("/auth/signin");
  } else {
    return (
      <SessionContext.Provider value={updatedSession || session}>
        {children}
      </SessionContext.Provider>
    );
  }
};

export default AuthWrapper;
