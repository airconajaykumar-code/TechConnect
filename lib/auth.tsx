"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@07";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("tc_auth");
    if (stored === "true") setIsLoggedIn(true);
    setLoaded(true);
  }, []);

  function login(username: string, password: string) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem("tc_auth", "true");
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("tc_auth");
    router.push("/admin/login");
  }

  if (!loaded) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
