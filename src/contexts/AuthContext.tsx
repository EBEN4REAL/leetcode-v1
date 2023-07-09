import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthContextType {
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
  );
}
