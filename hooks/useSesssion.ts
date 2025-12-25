"use client";

import { useState, useEffect } from "react";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  roles?: string[];
  avatar?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  is_verified?: boolean;
  phone?: string;
  isAdmin?: boolean;
  city?: string;
  country?: string;
  age?: number;
};

export type SessionState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
};

export function useSession() {
  const [session, setSession] = useState<SessionState>({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");

        if (response.ok) {
          const data = await response.json();
          setSession({
            user: data.user,
            isAuthenticated: true,
            isAdmin: data.user?.role === "admin" || data.user?.isAdmin || false,
            isLoading: false,
          });
        } else {
          setSession({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
        });
      }
    };

    fetchSession();
  }, []);

  return session;
}
