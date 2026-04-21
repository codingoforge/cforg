// hooks/useCurrentUser.ts
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type DBUser = {
  role: "admin" | "employee" | "user";
  isActive: boolean;
  name: string;
  email: string;
};

export function useCurrentUser() {
  const { getToken, isSignedIn } = useAuth();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) { setLoading(false); return; }

    getToken().then(async (token) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      }
      setLoading(false);
    });
  }, [isSignedIn]);

  return { dbUser, loading };
}