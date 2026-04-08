"use client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { trackLogin } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";
type AuthMode = "login" | "register";

const NoiseBg = () => (
  <svg
    className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.035] z-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.5 35.7 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l6.2 5.2C37.1 38.9 44 33 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

const handleSubmit = async () => {
  try {
    setLoading(true);

    let res;

    if (mode === "login") {
      res = await signInWithEmailAndPassword(auth, form.email, form.password);
    } else {
      res = await createUserWithEmailAndPassword(auth, form.email, form.password);
    }

    // 🔥 ADD THIS
    const token = await res.user.getIdToken();

    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    trackLogin();
    navigate("/");

  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};
const handleOAuth = async (provider: string) => {
  try {
    setOauthLoading(provider);

    if (provider === "google") {
      const res = await signInWithPopup(auth, googleProvider);

      const token = await res.user.getIdToken();

      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      trackLogin();
      navigate("/");
    }

  } catch (err: any) {
    alert(err.message);
  } finally {
    setOauthLoading(null);
  }
};
  const oauthProviders = [
    { id: "google",  label: "Google",  icon: <GoogleIcon />,  bg: "bg-white hover:bg-gray-50", text: "text-gray-700",  border: "border-gray-200" },
    { id: "github",  label: "GitHub",  icon: <GithubIcon />,  bg: "bg-[#161b22] hover:bg-[#1f2937]", text: "text-white",  border: "border-[#30363d]" },
    { id: "twitter", label: "X / Twitter", icon: <TwitterIcon />, bg: "bg-black hover:bg-zinc-900", text: "text-white", border: "border-zinc-700" },
    { id: "discord", label: "Discord", icon: <DiscordIcon />, bg: "bg-[#5865F2] hover:bg-[#4752C4]", text: "text-white", border: "border-[#4752C4]" },
  ];

  return (
    <div
      className="min-h-screen bg-[#07070f] text-white flex flex-col overflow-x-hidden relative"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #7c5cfc; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity:.4; } 50% { opacity:.7; } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .fade-up { animation: fadeUp 0.55s ease forwards; }
        .d1 { animation-delay: 0.05s; opacity:0; }
        .d2 { animation-delay: 0.15s; opacity:0; }
        .d3 { animation-delay: 0.25s; opacity:0; }
        .d4 { animation-delay: 0.35s; opacity:0; }
        .d5 { animation-delay: 0.45s; opacity:0; }

        .glow-orb { animation: glow-pulse 4s ease-in-out infinite; }
        .spinner { animation: spin 0.9s linear infinite; }

        .input-field {
          width: 100%;
          background: #0f0f22;
          border: 1px solid #1e1e3a;
          border-radius: 10px;
          padding: 11px 14px;
          color: #fff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
        }
        .input-field::placeholder { color: #3a3a5c; }
        .input-field:focus {
          border-color: #7c5cfc;
          box-shadow: 0 0 0 3px rgba(124,92,252,0.12);
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%);
          color: #fff;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 13px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover { opacity: .92; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }
        .btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          background-size: 200% 100%;
          animation: shimmer 2.4s linear infinite;
        }

        .tab-btn {
          flex: 1;
          padding: 9px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          text-transform: uppercase;
          letter-spacing: .06em;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: color .2s;
          border-radius: 8px;
        }
        .tab-btn.active {
          background: linear-gradient(135deg, #7c5cfc22, #4f8ef722);
          color: #a78bfa;
          box-shadow: inset 0 0 0 1px rgba(124,92,252,0.3);
        }
        .tab-btn.inactive { color: #3a3a5c; }
        .tab-btn.inactive:hover { color: #666699; }

        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
          border: 1px solid;
        }
        .oauth-btn:hover { opacity: .88; transform: translateY(-1px); }
        .oauth-btn:active { transform: translateY(0); }
        .oauth-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #1e1e3a, transparent);
        }

        .logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c5cfc, #4f8ef7);
          font-weight: 900;
          font-size: 16px;
          letter-spacing: -.03em;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(124,92,252,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,92,252,0.07) 1px, transparent 1px);
          background-size: 56px 56px;
        }
      `}</style>

      <NoiseBg />

      {/* Grid background */}
      <div className="grid-bg fixed inset-0 opacity-100 pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="glow-orb fixed -top-50 left-1/2 -translate-x-1/2 w-175 h-125 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(124,92,252,0.13) 0%, transparent 70%)" }} />
      <div className="glow-orb fixed -bottom-45 left-1/4 w-100 h-100 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(79,142,247,0.1) 0%, transparent 70%)" }} />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-30 ">
        <div className="w-full max-w-105 space-y-5">

          {/* Header */}
          <div className="fade-up d1 text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 text-[#a78bfa] px-4 py-1.5 rounded-full mb-3"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] inline-block"
                style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
              Secure Access Portal
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              {mode === "login" ? "Welcome back." : "Start building."}
            </h1>
            <p className="text-[#444466] text-sm leading-relaxed">
              {mode === "login"
                ? "Sign in to your CodingoForge workspace."
                : "Create your account and pitch your first idea today."}
            </p>
          </div>

          {/* Card */}
          <div className="fade-up d2 bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl p-6 shadow-2xl space-y-5">

            {/* Tabs */}
            <div className="flex gap-1 bg-[#0a0a16] border border-[#1e1e3a] rounded-10 p-1 rounded-xl">
              <button className={`tab-btn ${mode === "login" ? "active" : "inactive"}`}
                onClick={() => setMode("login")}>
                Sign In
              </button>
              <button className={`tab-btn ${mode === "register" ? "active" : "inactive"}`}
                onClick={() => setMode("register")}>
                Register
              </button>
            </div>

            {/* OAuth Providers */}
            <div className="grid grid-cols-2 gap-2.5">
              {oauthProviders.map(({ id, label, icon, bg, text, border }) => (
                <button
                  key={id}
                  className={`oauth-btn ${bg} ${text}`}
                  style={{ borderColor: border.replace("border-", "") }}
                  disabled={oauthLoading !== null}
                  onClick={() => handleOAuth(id)}
                >
                  {oauthLoading === id
                    ? <span className="spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block" style={{ width: 16, height: 16 }} />
                    : icon}
                  <span>{oauthLoading === id ? "Connecting..." : label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="divider-line" />
              <span className="text-[#2a2a4a] text-xs font-mono uppercase tracking-widest whitespace-nowrap">or with email</span>
              <div className="divider-line" />
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              {mode === "register" && (
                <div>
                  <label className="block text-[#444466] text-xs mb-1.5"
                    style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Full Name
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}

              <div>
                <label className="block text-[#444466] text-xs mb-1.5"
                  style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Email
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="jane@startup.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[#444466] text-xs"
                    style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      className="text-[#7c5cfc] text-xs hover:text-[#a78bfa] transition-colors font-medium"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    className="input-field"
                    type={showPass ? "text" : "password"}
                    placeholder={mode === "register" ? "Min. 8 characters" : "••••••••"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ paddingRight: "42px" }}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#3a3a5c", padding: 0, lineHeight: 1, fontSize: 13
                    }}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    style={{
                      marginTop: 2, accentColor: "#7c5cfc",
                      width: 14, height: 14, flexShrink: 0
                    }}
                  />
                  <label htmlFor="terms" className="text-[#444466] text-xs leading-relaxed" style={{ cursor: "pointer" }}>
                    I agree to the{" "}
                    <span className="text-[#7c5cfc] hover:text-[#a78bfa] cursor-pointer transition-colors">Terms of Service</span>
                    {" "}and{" "}
                    <span className="text-[#7c5cfc] hover:text-[#a78bfa] cursor-pointer transition-colors">Privacy Policy</span>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="btn-primary"
              disabled={loading || !form.email || !form.password || (mode === "register" && !form.name)}
              onClick={handleSubmit}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner inline-block border-2 border-white border-t-transparent rounded-full"
                    style={{ width: 14, height: 14 }} />
                  {mode === "login" ? "Authenticating..." : "Creating account..."}
                </span>
              ) : (
                mode === "login" ? "Sign In →" : "Create Account →"
              )}
            </button>
          </div>

          {/* Footer toggle */}
          <div className="fade-up d3 text-center text-sm text-[#333355]">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  className="text-[#7c5cfc] hover:text-[#a78bfa] font-bold transition-colors"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  className="text-[#7c5cfc] hover:text-[#a78bfa] font-bold transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Security badge */}
          <div className="fade-up d4 flex items-center justify-center gap-2 text-[#2a2a4a]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/>
            </svg>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              256-bit SSL · SOC 2 compliant
            </span>
          </div>
        </div>
      </div>

      {/* Bottom branding strip */}
      <div className="relative z-10 border-t border-[#0f0f22] py-4 text-center">
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1e1e3a" }}>
          © 2026 CodingoForge · MVP Studio
        </span>
      </div>
    </div>
  );
}