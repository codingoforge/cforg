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
        background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, #0d2040 30%, #070f1d 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)",
        padding: "2rem",
      },

      socialButtonsBlockButton: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
      },
      socialButtonsBlockButtonText: {
        color: "#dbeafe",
        fontWeight: "600",
      },

      dividerLine: { background: "rgba(255,255,255,0.07)" },
      dividerText: { color: "#6666aa" },

      formFieldLabel: {
        color: "#8ab4ff",
        fontSize: "12px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
      formFieldInput: {
        background: "#0a1424",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        color: "#ffffff",
      },

      formButtonPrimary: {
        background: "linear-gradient(135deg, #8ab4ff 0%, #5b8def 50%, #7c5cff 100%)",
        borderRadius: "100px",
        fontWeight: "900",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        padding: "12px 20px",
        boxShadow: "0 0 28px rgba(138,180,255,0.25)",
        border: "none",
        fontFamily: "'DM Sans', sans-serif",
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
          background-image: url('/hero_bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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
          background: radial-gradient(circle, rgba(138,180,255,0.12) 0%, transparent 65%);
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
          background: linear-gradient(to right, #ffffff, #dbeafe, #8ab4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.04em;
          margin: 0 0 8px;
        }
        .auth-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
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

        .auth-clerk-wrap .cl-socialButtonsBlockButton svg {
          fill: #ffffff !important;
          color: #ffffff !important;
        }
        .auth-clerk-wrap .cl-socialButtonsBlockButton path {
          fill: #ffffff !important;
        }

        .auth-toggle {
          margin-top: 1.25rem;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }
        .auth-toggle button {
          background: none;
          border: none;
          color: #8ab4ff;
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
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .auth-back:hover { color: #8ab4ff; }
      `}</style>

      <div className="auth-root">
        <div className="auth-wrap">

          <div className="auth-header">
            <a href="/" className="auth-logo-link">
              <img src="/logo.jpg" alt="CodingoForge" />
              <span className="auth-logo-name">CodingoForge</span>
            </a>
            <h1 className="auth-title">
              {mode === "login" ? "Welcome" : "Join CodingoForge"}
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