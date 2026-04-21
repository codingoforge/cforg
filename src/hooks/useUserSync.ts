//hooks/useUserSync.ts
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function useUserSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      try {
        const token = await getToken();
        const API_URL = import.meta.env.VITE_API_URL;

        await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ User synced to DB");
      } catch (err) {
        console.error("❌ Sync failed:", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn]);
}