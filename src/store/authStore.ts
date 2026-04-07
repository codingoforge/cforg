import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAdmin: () => get().user?.role === "admin",
}));