"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SessionData = {
  token: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type SessionContextType = {
  session: SessionData | null;
  setSession: (session: SessionData | null) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionData | null>(null);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};