import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/lib/data/types";

const AUTH_KEY = "dceLup_auth_user";

const demoUsers: User[] = [
  {
    id: "user-hq",
    nama: "Admin Pusat",
    email: "admin@dcelup.id",
    role: "hq_admin",
  },
  {
    id: "user-o1",
    nama: "Budi - Outlet 1",
    email: "outlet1@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-1",
  },
  {
    id: "user-o2",
    nama: "Siti - Outlet 2",
    email: "outlet2@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-2",
  },
  {
    id: "user-o3",
    nama: "Agus - Outlet 3",
    email: "outlet3@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-3",
  },
];

interface AuthContextValue {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
  currentOutletId?: string;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  isStaff: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      }
      setIsLoading(false);
    }
  }, []);

  const login = (userId: string) => {
    const found = demoUsers.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const value: AuthContextValue = {
    user,
    login,
    logout,
    isAdmin: user?.role === "hq_admin",
    isStaff: user?.role === "outlet_staff",
    currentOutletId: user?.outlet_id,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
