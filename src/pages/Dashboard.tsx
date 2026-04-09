import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Welcome {user?.fullName}
        </h1>

        <UserButton />
      </div>

      {/* User Info */}
      <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
        <h2 className="text-lg font-semibold mb-4">User Info</h2>

        {data ? (
          <pre className="text-sm text-green-400">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>

    </div>
  );
}