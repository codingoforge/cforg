import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type UserData = {
  clerkId: string;
  role?: string;
  orgId?: string;
};

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        setData(result.user);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white flex">

      {/* 🔥 Sidebar */}
      <aside className="w-64 bg-[#0d0d1a] border-r border-[#1e1e3a] p-5 flex flex-col justify-between">
        
        <div>
          <h2 className="text-lg font-bold mb-6">CodingoForge</h2>

          <nav className="space-y-2 text-sm">
            <p className="text-[#555] uppercase text-xs">Menu</p>
            <button className="block w-full text-left p-2 rounded hover:bg-[#1a1a2e]">Dashboard</button>
            <button className="block w-full text-left p-2 rounded hover:bg-[#1a1a2e]">Projects</button>
            <button className="block w-full text-left p-2 rounded hover:bg-[#1a1a2e]">Payments</button>
            <button className="block w-full text-left p-2 rounded hover:bg-[#1a1a2e]">Settings</button>
          </nav>
        </div>

        <div className="text-xs text-[#555]">
          Logged in as <br />
          <span className="text-white">{user?.primaryEmailAddress?.emailAddress}</span>
        </div>
      </aside>

      {/* 🔥 Main content */}
      <main className="flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-[#666] text-sm">
              Welcome back, {user?.firstName}
            </p>
          </div>

          <UserButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Projects", value: "2" },
            { label: "Active", value: "1" },
            { label: "Completed", value: "1" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111] border border-[#222] p-5 rounded-xl"
            >
              <p className="text-[#666] text-sm">{item.label}</p>
              <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* User data */}
        <div className="bg-[#111] border border-[#222] p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Account Info</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : data ? (
            <div className="space-y-2 text-sm">
              <p><span className="text-[#666]">Clerk ID:</span> {data.clerkId}</p>
              <p><span className="text-[#666]">Role:</span> {data.role || "user"}</p>
              <p><span className="text-[#666]">Org:</span> {data.orgId || "N/A"}</p>
            </div>
          ) : (
            <p className="text-red-400">Failed to load user data</p>
          )}
        </div>

      </main>
    </div>
  );
}