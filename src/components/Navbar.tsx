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
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');

        .cf-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .cf-nav.scrolled {
          background: rgba(7, 7, 15, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid #1e1e3a;
        }
        .cf-nav.top {
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .cf-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .cf-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .cf-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: #fff;
          letter-spacing: -0.03em;
          flex-shrink: 0;
        }
        .cf-logo-text {
          font-weight: 900;
          font-size: 15px;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .cf-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .cf-nav-links a {
          text-decoration: none;
          color: #555580;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          font-family: 'Space Mono', monospace;
        }
        .cf-nav-links a:hover {
          color: #a78bfa;
          background: rgba(124, 92, 252, 0.08);
        }
        .cf-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .cf-btn-ghost {
          text-decoration: none;
          color: #888899;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 9px;
          border: 1px solid #1e1e3a;
          background: transparent;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          font-family: 'Space Mono', monospace;
        }
        .cf-btn-ghost:hover {
          color: #a78bfa;
          border-color: rgba(124, 92, 252, 0.35);
        }
        .cf-btn-primary {
          text-decoration: none;
          color: #fff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 9px 18px;
          border-radius: 9px;
          border: none;
          background: linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%);
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 0 20px rgba(124, 92, 252, 0.25);
        }
        .cf-btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* Status pill */
        .cf-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(124, 92, 252, 0.08);
          border: 1px solid rgba(124, 92, 252, 0.2);
          border-radius: 100px;
          padding: 4px 10px 4px 8px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a78bfa;
          white-space: nowrap;
        }
        .cf-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: cf-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes cf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        /* Mobile hamburger */
        .cf-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .cf-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: #888899;
          transition: transform 0.2s, opacity 0.2s;
        }
        .cf-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .cf-hamburger.open span:nth-child(2) { opacity: 0; }
        .cf-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .cf-mobile-menu {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: rgba(7, 7, 15, 0.97);
          border-bottom: 1px solid #1e1e3a;
          backdrop-filter: blur(20px);
          z-index: 99;
          padding: 1.5rem 2rem 2rem;
          flex-direction: column;
          gap: 0.5rem;
        }
        .cf-mobile-menu.open { display: flex; }
        .cf-mobile-menu a {
          text-decoration: none;
          color: #555580;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 12px 0;
          border-bottom: 1px solid #1a1a2e;
          font-family: 'Space Mono', monospace;
          transition: color 0.2s;
        }
        .cf-mobile-menu a:hover { color: #a78bfa; }
        .cf-mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .cf-nav-links,
          .cf-nav-actions,
          .cf-status-pill { display: none !important; }
          .cf-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`cf-nav ${scrolled ? "scrolled" : "top"}`}>
        <div className="cf-nav-inner">
          {/* Logo */}
          <a href="/" className="cf-logo">
               <img 
                src="/logo.jpeg" 
                alt="CodingoForge Logo" 
                className="h-10 w-auto object-contain"
              />
            <span className="cf-logo-text">CodingoForge</span>
          </a>

          {/* Desktop links */}
          <ul className="cf-nav-links">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Status pill */}
          <div className="cf-status-pill">
            <span className="cf-status-dot" />
            Accepting Projects
          </div>

          {/* Desktop actions */}
          <div className="cf-nav-actions">
            <SignedOut>
              <SignInButton>
                <button className="cf-btn-ghost">Sign In</button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <button type="button" className="cf-btn-primary" onClick={onOpenModal}>Get Started →</button>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      <div className={`cf-mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="cf-mobile-actions">
          <SignedOut>
            <SignInButton>
              <button className="cf-btn-ghost">Sign In</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a href="/dashboard" className="cf-btn-ghost">Dashboard</a>
          </SignedIn>

          <button
            type="button"
            className="cf-btn-primary"
            onClick={onOpenModal}
          >
            Get Started →
          </button>
        </div>
          <button
            type="button"
            className="cf-btn-primary"
            style={{ textAlign: "center" }}
            onClick={onOpenModal}
          >
            Get Started →
          </button>
       
      </div>
    </>
  );
}