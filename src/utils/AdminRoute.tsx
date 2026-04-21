import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }: any) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      if (!isLoaded || !isSignedIn) return;

      // 🔥 BEST: read from Clerk metadata
      const role = user?.publicMetadata?.role;

      if (role === "admin") {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    };

    checkRole();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || allowed === null) return <div>Loading...</div>;

  if (!isSignedIn) return <Navigate to="/sign-in" />;

  if (!allowed) return <Navigate to="/" />;

  return children;
}