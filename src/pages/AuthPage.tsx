import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const clerkAppearance = {
    variables: {
      colorPrimary: "#7c5cfc",
      colorBackground: "#0f0f1a",
      colorInputBackground: "#13132a",
      colorInputText: "#ffffff",
      colorText: "#ffffff",
      colorTextSecondary: "#6666aa",
      colorNeutral: "#2a2a4a",
      colorDanger: "#ff6b6b",
      borderRadius: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "14px",
    },
    elements: {
      headerTitle: { display: "none" },
      headerSubtitle: { display: "none" },
      header: { display: "none" },
      footer: { display: "none" },
      footerAction: { display: "none" },

      card: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        boxShadow: "0 0 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,92,252,0.05)",
        padding: "2rem",
      },

      socialButtonsBlockButton: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
      },
      socialButtonsBlockButtonText: {
        color: "#aaaacc",
        fontWeight: "600",
      },

      dividerLine: { background: "rgba(255,255,255,0.07)" },
      dividerText: { color: "#444466" },

      formFieldLabel: {
        color: "#6666aa",
        fontSize: "12px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
      formFieldInput: {
        background: "#13132a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
        color: "#ffffff",
      },

      formButtonPrimary: {
        background: "linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%)",
        borderRadius: "10px",
        fontWeight: "700",
        boxShadow: "0 4px 24px rgba(124,92,252,0.35)",
        border: "none",
      },

      footerActionLink: { color: "#7c5cfc" },

      identityPreviewText: { color: "#aaaacc" },
      identityPreviewEditButton: { color: "#7c5cfc" },

      otpCodeFieldInput: {
        background: "#13132a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        color: "#ffffff",
      },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

        .auth-root {
          min-height: 100vh;
          background: #07070f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: absolute;
          top: -300px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 65%);
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .auth-wrap {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        .auth-logo-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          margin-bottom: 1.75rem;
        }
        .auth-logo-link img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(124,92,252,0.35);
        }
        .auth-logo-name {
          font-weight: 900;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.04em;
          margin: 0 0 8px;
        }
        .auth-subtitle {
          font-size: 14px;
          color: #444466;
          margin: 0;
        }

        .auth-clerk-wrap {
          width: 100%;
        }

        /* Kill the dev mode orange banner & white footer */
        .auth-clerk-wrap .cl-internal-b3fm6y,
        .auth-clerk-wrap [data-localization-key="developmentMode"],
        .auth-clerk-wrap .cl-footer {
          display: none !important;
        }

        .auth-toggle {
          margin-top: 1.25rem;
          font-size: 13px;
          color: #444466;
          text-align: center;
        }
        .auth-toggle button {
          background: none;
          border: none;
          color: #a78bfa;
          font-weight: 700;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-left: 5px;
          padding: 0;
        }
        .auth-toggle button:hover { opacity: 0.7; }

        .auth-back {
          display: inline-block;
          margin-top: 1.5rem;
          font-size: 11px;
          color: #2a2a44;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .auth-back:hover { color: "#7c5cfc"; }
      `}</style>

      <div className="auth-root">
        <div className="auth-wrap">

          <div className="auth-header">
            <a href="/" className="auth-logo-link">
              <img src="/logo.jpeg" alt="CodingoForge" />
              <span className="auth-logo-name">CodingoForge</span>
            </a>
            <h1 className="auth-title">
              {mode === "login" ? "Welcome back" : "Join CodingoForge"}
            </h1>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Create your account to get started"}
            </p>
          </div>

          <div className="auth-clerk-wrap">
            {mode === "login" ? (
              <SignIn
                routing="hash"
                afterSignInUrl="/dashboard"
                appearance={clerkAppearance}
              />
            ) : (
              <SignUp
                routing="hash"
                afterSignUpUrl="/dashboard"
                appearance={clerkAppearance}
              />
            )}
          </div>

          <div className="auth-toggle">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>

          <a href="/" className="auth-back">← Back to home</a>
        </div>
      </div>
    </>
  );
}