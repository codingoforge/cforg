"use client";
import { useState, useEffect } from "react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

type NavbarProps = {
  onOpenModal: () => void;
};

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Solution", href: "/solution" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/conetect" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        .cf-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .cf-nav.scrolled {
          background: rgba(8, 18, 34, 0.92);
          border-color: rgba(138, 180, 255, 0.22);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
        }

        .cf-nav.top {
          position: fixed;
          top: 16px;              /* float it down from top */
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          font-family: 'DM Sans', sans-serif;
          width: calc(100% - 48px);
          max-width: 1100px;
          border-radius: 999px;   /* full pill shape */
          background: rgba(8, 18, 34, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(138, 180, 255, 0.14);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          transition: all 0.3s ease;

        }

        .cf-nav-inner {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 1.25rem;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: nowrap;
        }

        .cf-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .cf-logo img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(138, 180, 255, 0.2);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }

        .cf-logo-text {
          font-weight: 900;
          font-size: 16px;
          color: #f8fbff;
          letter-spacing: -0.03em;
        }

        .cf-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .cf-nav-links li {
          flex-shrink: 0;
        }

        .cf-nav-links a {
          text-decoration: none;
          color: rgba(232, 241, 255, 0.8);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          padding: 8px 11px;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s, transform 0.2s;
          font-family: 'Space Mono', monospace;
          white-space: nowrap;
        }

        .cf-nav-links a:hover {
          color: #ffffff;
          background: rgba(138, 180, 255, 0.12);
          transform: translateY(-1px);
        }

        .cf-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .cf-btn-ghost {
          text-decoration: none;
          color: #eaf2ff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 16px;
          border-radius: 100px;
          border: 1px solid rgba(138, 180, 255, 0.18);
          background: rgba(255, 255, 255, 0.04);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .cf-btn-ghost:hover {
          background: rgba(138, 180, 255, 0.12);
          border-color: rgba(138, 180, 255, 0.28);
          transform: translateY(-1px);
        }

        .cf-btn-primary {
          text-decoration: none;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 11px 18px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #8ab4ff 0%, #7c5cff 100%);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 10px 24px rgba(138, 180, 255, 0.22);
          white-space: nowrap;
        }

        .cf-btn-primary:hover {
          opacity: 0.96;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(124, 92, 255, 0.28);
        }

        .cf-btn-dashboard {
          text-decoration: none;
          color: #eaf2ff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid rgba(138, 180, 255, 0.18);
          background: rgba(255, 255, 255, 0.04);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .cf-btn-dashboard:hover {
          background: rgba(138, 180, 255, 0.12);
          border-color: rgba(138, 180, 255, 0.28);
          transform: translateY(-1px);
        }

        .cf-status-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.24);
          border-radius: 999px;
          padding: 7px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #4ade80;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cf-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          animation: cf-pulse 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes cf-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.72; transform: scale(1.12); }
        }

        .cf-hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
        }

        .cf-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          border-radius: 2px;
          background: #fff;
          transition: transform 0.2s, opacity 0.2s;
        }

        .cf-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .cf-hamburger.open span:nth-child(2) { opacity: 0; }
        .cf-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        .cf-mobile-menu {
          display: none;
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          background: rgba(8, 18, 34, 0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(138, 180, 255, 0.12);
          z-index: 99;
          padding: 1.25rem 1.25rem 1.75rem;
          flex-direction: column;
          gap: 0.25rem;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        .cf-mobile-menu.open {
          display: flex;
        }

        .cf-mobile-menu a {
          text-decoration: none;
          color: rgba(232, 241, 255, 0.8);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 12px;
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          transition: background 0.2s, color 0.2s;
        }

        .cf-mobile-menu a:hover {
          color: #fff;
          background: rgba(138, 180, 255, 0.12);
        }

        .cf-mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(138, 180, 255, 0.12);
        }

        @media (max-width: 1100px) {
          .cf-nav-links a {
            padding: 8px 9px;
            font-size: 10px;
          }
        }

        @media (max-width: 900px) {
          .cf-nav-links,
          .cf-nav-actions,
          .cf-status-pill {
            display: none !important;
          }
          .cf-hamburger {
            display: flex;
          }
        }
      `}</style>

      <nav className={`cf-nav ${scrolled ? "scrolled" : "top"}`}>
        <div className="cf-nav-inner">
          <a href="/" className="cf-logo">
            <img src="/logo.jpg" alt="CodingoForge Logo" />
            <span className="cf-logo-text">Codingo Forge</span>
          </a>

          <ul className="cf-nav-links">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="cf-nav-actions">
            <SignedOut>
              <SignInButton mode="redirect" fallbackRedirectUrl="/sign-in">
                <button className="cf-btn-ghost">Sign In</button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <a href="/dashboard" className="cf-btn-dashboard">Dashboard</a>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

           
          </div>

          <button
            className={`cf-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`cf-mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}

        <div className="cf-mobile-actions">
          <SignedOut>
            <SignInButton mode="redirect" fallbackRedirectUrl="/sign-in">
              <button className="cf-btn-ghost" style={{ width: "100%" }}>Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a href="/dashboard" className="cf-btn-dashboard" style={{ textAlign: "center" }}>
              Dashboard
            </a>
          </SignedIn>

          <SignedOut>
            <button
              type="button"
              className="cf-btn-primary"
              style={{ textAlign: "center" }}
              onClick={() => {
                setMenuOpen(false);
                onOpenModal();
              }}
            >
              Get Started →
            </button>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
