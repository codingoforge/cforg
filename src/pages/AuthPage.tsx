import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      
      {mode === "login" ? <SignIn /> : <SignUp />}

      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Create account" : "Sign in"}
      </button>

    </div>
  );
}